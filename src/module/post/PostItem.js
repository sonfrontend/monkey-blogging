import React from "react";
import slugify from "slugify";
import styled from "styled-components";
import PostCategory from "./PostCategory";
import PostImage from "./PostImage";
import PostMeta from "./PostMeta";
import PostTitle from "./PostTitle";
const PostItemStyles = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  .post {
    &-image {
      height: 202px;
      margin-bottom: 20px;
      display: block;
      width: 100%;
    }
    &-category {
      display: inline-block;
      padding: 8px;
      border-radius: 8px;
      color: #6b6b6b;
      font-size: 14px;
      font-weight: 600;
      background-color: #f3edff;
      margin-bottom: 16px;
    }

    &-title {
      margin-bottom: 12px;
    }
  }
`;

const PostItem = ({ data }) => {
  const date = data?.createdAt?.seconds
    ? new Date(data?.createdAt?.seconds * 1000)
    : new Date();
  const formatDate = new Date(date).toLocaleDateString("vi-VI");
  if (!data) return null;
  return (
    <PostItemStyles>
      <PostImage to="/" url={data.image} alt=""></PostImage>
      <PostCategory to={data.category?.slug}>
        {data.category?.name}
      </PostCategory>
      <PostTitle to={data.slug}>{data.title}</PostTitle>
      <PostMeta
        to={slugify(data?.user?.userName || "", { lower: true })}
        authorName={data?.user.fullName}
        date={formatDate}
      ></PostMeta>
    </PostItemStyles>
  );
};

export default PostItem;
