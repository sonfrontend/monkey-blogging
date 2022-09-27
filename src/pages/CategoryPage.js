import { collection, onSnapshot, query, where } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Heading from "../components/layout/Heading";
import Layout from "../components/layout/Layout";
import { db } from "../firebase-app/firebase-config";
import PostItem from "../module/post/PostItem";

const CategoryPage = () => {
  const { slug } = useParams();
  const [posts, setPosts] = useState([]);
  useEffect(() => {
    const docRef = query(
      collection(db, "posts"),
      where("category.slug", "==", slug)
    );
    onSnapshot(docRef, (snapshot) => {
      let result = [];
      snapshot.forEach((doc) => {
        result.push({ id: doc.id, ...doc.data() });
      });
      setPosts(result);
    });
  }, [slug]);
  if (posts.length <= 0) return null;
  return (
    <Layout>
      <div className="container">
        <Heading>Danh mục {slug}</Heading>
        <div className="grid-layout grid-layout--primary">
          {posts?.map((item) => (
            <PostItem key={item.id} data={item}></PostItem>
          ))}
        </div>
      </div>
    </Layout>
  );
};

export default CategoryPage;
