import React from "react";
import styled from "styled-components";
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
      img {
        width: 100%;
        height: 100%;
        object-fit: cover;
        border-radius: 16px;
      }
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

const PostItem = () => {
  return (
    <PostItemStyles>
      <div className="post-image">
        <img
          src="https://images.unsplash.com/photo-1570993492881-25240ce854f4?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2290&q=80"
          alt=""
        />
      </div>
      <div className="post-category">Kiến thức</div>
      <PostTitle>
        Hướng dẫn setup phòng cực chill dành cho người mới toàn tập
      </PostTitle>

      {/* <div className="post-info">
        <span className="post-time">Mar 23</span>
        <span className="post-dot"></span>
        <span className="post-author">Andiez Le</span>
      </div> */}
      <PostMeta></PostMeta>
    </PostItemStyles>
  );
};

export default PostItem;
