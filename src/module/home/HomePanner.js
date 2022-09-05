import React from "react";
import styled from "styled-components";
import { Button } from "../../components/button";

const HomePanerStyles = styled.div`
  min-height: 520px;
  padding: 40px 0;
  margin-bottom: 50px;
  background-image: linear-gradient(
    to right bottom,
    ${(props) => props.theme.primary},
    ${(props) => props.theme.secondary}
  );

  .banner {
    display: flex;
    justify-content: center;
    align-items: center;
  }
  .banner-content {
    max-width: 600px;
    color: white;
  }
  .banner-heading {
    font-size: 36px;
    margin-bottom: 20px;
  }
  .banner-desc {
    line-height: 1.75;
    margin-bottom: 40px;
  }
`;

const HomePanner = () => {
  return (
    <HomePanerStyles>
      <div className="container">
        <div className="banner">
          <div className="banner-content">
            <h1 className="banner-heading">Monkey Blogging</h1>
            <p className="banner-desc">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Eum
              corrupti odio expedita beatae possimus deleniti nulla id tempora
              ipsa quos consequuntur, magni omnis vitae porro delectus quidem
              quibusdam soluta inventore.
            </p>
            <Button to="/sign-up" kind="secondary">
              Get started
            </Button>
          </div>
          <div className="banner-image">
            <img src="/img-banner.png" alt="" />
          </div>
        </div>
      </div>
    </HomePanerStyles>
  );
};

export default HomePanner;
