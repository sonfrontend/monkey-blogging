import {
  collection,
  deleteDoc,
  doc,
  getDocs,
  limit,
  onSnapshot,
  query,
  startAfter,
  where,
} from "firebase/firestore";
import { debounce } from "lodash";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { ActionDelete, ActionEdit, ActionView } from "../../components/action";
import { Button } from "../../components/button";
import { Label, LabelStatus } from "../../components/label";
import { Table } from "../../components/table";
import { useAuth } from "../../contexts/authContext";
import { db } from "../../firebase-app/firebase-config";
import { userRole, userStatus } from "../../utils/constants";
import DashboardHeading from "../dashbroad/DashboardHeading";

const POST_PER_PAGE = 1;

const PostManage = () => {
  const [postList, setPostList] = useState([]);
  console.log("postList: ", postList);
  const [filter, setFilter] = useState("");
  const [lastDoc, setLastDoc] = useState();
  const [total, setTotal] = useState(0);
  const navigate = useNavigate();
  useEffect(() => {
    async function fetchData() {
      const colRef = collection(db, "posts");
      const newRef = filter
        ? query(
            colRef,
            where("title", ">=", filter),
            where("title", "<=", filter + "utf8")
          )
        : query(colRef, limit(POST_PER_PAGE));
      const documentSnapshots = await getDocs(newRef);
      const lastVisible =
        documentSnapshots.docs[documentSnapshots.docs.length - 1];
      onSnapshot(colRef, (snapshot) => {
        setTotal(snapshot.size);
      });
      onSnapshot(newRef, (snapshot) => {
        let result = [];
        snapshot.forEach((doc) => {
          result.push({
            id: doc.id,
            ...doc.data(),
          });
        });
        setPostList(result);
      });
      setLastDoc(lastVisible);
    }
    fetchData();
  }, [filter]);

  const handleDeletePost = async (post) => {
    const colRef = doc(db, "posts", post.id);

    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        await deleteDoc(colRef);
        // Swal.fire("Deleted!", "Your file has been deleted.", "success");
      }
    });
    // const docData = await getDoc(colRef);
  };

  const handleInputFilter = debounce((e) => {
    setFilter(e.target.value);
  }, 500);

  const handleLoadMorePost = async () => {
    const nextRef = query(
      collection(db, "posts"),
      startAfter(lastDoc || 0),
      limit(POST_PER_PAGE)
    );
    onSnapshot(nextRef, (snapshot) => {
      let result = [];
      snapshot.forEach((doc) => {
        result.push({
          id: doc.id,
          ...doc.data(),
        });
      });
      setPostList([...postList, ...result]);
    });

    const documentSnapshots = await getDocs(nextRef);
    const lastVisible =
      documentSnapshots.docs[documentSnapshots.docs.length - 1];
    setLastDoc(lastVisible);
  };

  const renderLabelStatus = (status) => {
    switch (status) {
      case userStatus.ACTIVE:
        return <LabelStatus type="success">APPROVED</LabelStatus>;
        break;
      case userStatus.PENDING:
        return <LabelStatus type="warning">PENDING</LabelStatus>;
        break;
      case userStatus.BAN:
        return <LabelStatus type="danger">REJECTED</LabelStatus>;
        break;
      default:
        break;
    }
  };
  const { userInfo } = useAuth();
  if (userInfo?.role === userRole.ADMIN)
    return <Label>You must be an admin!</Label>;
  return (
    <div>
      <DashboardHeading
        title="All posts"
        desc="Manage all post"
      ></DashboardHeading>
      <div className="flex justify-end gap-5 md-10">
        <div className="w-full max-w-[300px]">
          <input
            type="text"
            className="w-full p-4 border border-gray-300 border-solid rounded-lg"
            placeholder="Search post..."
            onChange={handleInputFilter}
          />
        </div>
      </div>
      <Table>
        <thead>
          <tr>
            <th>Id</th>
            <th>Post</th>
            <th>Category</th>
            <th>Author</th>
            <th>Status</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {postList.length > 0 &&
            postList.map((post) => {
              const date = post?.createdAt?.seconds
                ? new Date(post?.createdAt?.seconds * 1000)
                : new Date();
              const formatDate = new Date(date).toLocaleDateString("vi-VI");
              return (
                <tr key={post.id}>
                  <td title={post.id}>{post.id.slice(0, 5) + "..."}</td>
                  <td className="whitespace-nowrap">
                    <div className="flex items-center gap-x-3">
                      <img
                        src={post?.image}
                        alt=""
                        className="object-cover w-10 h-10 rounded-md flex-shrink-0"
                      />
                      <div className="flex-1">
                        <h3 className="font-semibold max-w-[300px] whitespace-pre-wrap">
                          {post?.title}
                        </h3>
                        <time className="text-sm text-gray-400">
                          {formatDate}
                        </time>
                      </div>
                    </div>
                  </td>
                  <td>{post?.category?.name}</td>
                  <td>{post?.user.fullName}</td>
                  <td>{renderLabelStatus(Number(post?.user?.status))}</td>
                  <td>
                    <div className="flex item-center gap-x-3">
                      <ActionView
                        onClick={() => navigate(`/${post.slug}`)}
                      ></ActionView>
                      <ActionEdit
                        onClick={() => {
                          navigate(`/manage/update-post?id=${post.id}`);
                        }}
                      ></ActionEdit>
                      <ActionDelete
                        onClick={() => {
                          handleDeletePost(post);
                        }}
                      ></ActionDelete>
                    </div>
                  </td>
                </tr>
              );
            })}
        </tbody>
      </Table>
      {total > postList.length && (
        <div className="mt-10 text-center">
          <Button
            className="mx-auto w-[200px]"
            kind="primary"
            onClick={handleLoadMorePost}
          >
            Load more
          </Button>
        </div>
      )}
    </div>
  );
};

export default PostManage;
