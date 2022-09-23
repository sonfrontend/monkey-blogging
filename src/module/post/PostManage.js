import {
  collection,
  getDocs,
  limit,
  onSnapshot,
  query,
  where,
} from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { ActionDelete, ActionEdit, ActionView } from "../../components/action";
import { Button } from "../../components/button";
import { Dropdown } from "../../components/dropdown";
import { LabelStatus } from "../../components/label";
import { Pagination } from "../../components/pagination";
import { Table } from "../../components/table";
import { db } from "../../firebase-app/firebase-config";
import DashboardHeading from "../dashbroad/DashboardHeading";

const POST_PER_PAGE = 1;

const PostManage = () => {
  const [postList, setPostList] = useState([]);
  console.log("postList: ", postList);
  const [filter, setFilter] = useState("");
  const [lastDoc, setLastDoc] = useState();
  const navigate = useNavigate();
  useEffect(() => {
    async function fetchData() {
      const colRef = collection(db, "posts");
      const newRef = filter
        ? query(
            colRef,
            where("name", ">=", filter),
            where("name", "<=", filter + "utf8")
          )
        : query(colRef, limit(POST_PER_PAGE));
      const documentSnapshots = await getDocs(newRef);
      const lastVisible =
        documentSnapshots.docs[documentSnapshots.docs.length - 1];

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

  const handleDeletePost = () => {};
  return (
    <div>
      <DashboardHeading
        title="All posts"
        desc="Manage all post"
      ></DashboardHeading>
      <div className="flex justify-end gap-5 md-10">
        <div className="w-full max-w-[200px]">
          <Dropdown>
            <Dropdown.Select placeholder="Category"></Dropdown.Select>
          </Dropdown>
        </div>
        <div className="w-full max-w-[300px]">
          <input
            type="text"
            className="w-full p-4 border border-gray-300 border-solid rounded-lg"
            placeholder="Search post..."
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

                  <td>
                    <div className="flex item-center gap-x-3">
                      <ActionView
                        onClick={() => navigate(`/${post.slug}`)}
                      ></ActionView>
                      <ActionEdit
                        onClick={() => {
                          navigate(`/manage/update-user?id=${post.id}`);
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
      <div className="mt-10 text-center">
        <Button className="mx-auto w-[200px]" kind="primary">
          Load more
        </Button>
      </div>
    </div>
  );
};

export default PostManage;
