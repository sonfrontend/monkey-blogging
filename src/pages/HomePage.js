import { signOut } from "firebase/auth";
import React from "react";
import styled from "styled-components";
import Header from "../components/layout/Header";
import Layout from "../components/layout/Layout";
import { auth } from "../firebase-app/firebase-config";
import HomeFeature from "../module/home/HomeFeature";
import HomeNewest from "../module/home/HomeNewest";
import HomePanner from "../module/home/HomePanner";

const HomePageStyles = styled.div``;

const HomePage = () => {
  return (
    <HomePageStyles>
      <Layout>
        <HomePanner></HomePanner>
        <HomeFeature></HomeFeature>
        <HomeNewest></HomeNewest>
      </Layout>
    </HomePageStyles>
  );
};

export default HomePage;
