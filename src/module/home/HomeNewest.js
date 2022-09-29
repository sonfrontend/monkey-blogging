import PostItem from "../../module/post/PostItem";
import PostNewestItem from "../../module/post/PostNewestItem";
import PostNewestLarge from "../../module/post/PostNewestLarge";
import React, { useEffect, useState } from "react";
import styled from "styled-components";
import Heading from "../../components/layout/Heading";
import { v4 } from "uuid";
import {
  collection,
  limit,
  onSnapshot,
  query,
  where,
} from "firebase/firestore";
import { db } from "../../firebase-app/firebase-config";

const HomeNewestStyles = styled.div`
  .layout {
    display: grid;
    grid-template-columns: repeat(2, minmax(0, 1fr));
    grid-gap: 40px;
    margin-bottom: 64px;
    align-items: start;
  }
  .sidebar {
    padding: 28px 20px;
    background-color: #f3edff;
    border-radius: 16px;
  }
`;

const HomeNewest = () => {
  const [posts, setPosts] = useState([]);
  console.log("posts: ", posts);
  useEffect(() => {
    const colRef = collection(db, "posts");
    const q = query(
      colRef,
      where("status", "==", 1),
      where("hot", "==", false),
      limit(4)
    );
    onSnapshot(
      q,
      (snapshot) => {
        const result = [];
        snapshot.forEach((doc) => {
          result.push({
            id: doc.id,
            ...doc.data(),
          });
        });
        setPosts(result);
      },
      (error) => {
        console.log("error: ", error);
        // ...
      }
    );
  }, []);
  if (posts?.length <= 0) return null;
  const [first, ...other] = posts;
  console.log("other: ", other);
  return (
    <HomeNewestStyles className="home-block">
      <div className="container">
        <Heading>Mới nhất</Heading>
        <div className="layout">
          <PostNewestLarge data={first}></PostNewestLarge>
          {other.length > 0 && (
            <div className="sidebar">
              {other.length > 0 &&
                other.map((item) => (
                  <PostNewestItem key={v4()} data={item}></PostNewestItem>
                ))}
            </div>
          )}
        </div>
        <div className="grid-layout grid-layout--primary">
          <PostItem></PostItem>
          <PostItem></PostItem>
          <PostItem></PostItem>
          <PostItem></PostItem>
        </div>
      </div>
    </HomeNewestStyles>
  );
};

export default HomeNewest;
