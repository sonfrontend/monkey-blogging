import React, { useState } from "react";
import styled from "styled-components";
import { Input } from "../components/input";
import { Label } from "../components/label";
import { useForm } from "react-hook-form";
import { IconEyeClose, IconEyeOpen } from "../components/icon";
import { Field } from "../components/field";
import { Button } from "../components/button";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useEffect } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { auth } from "../firebase-app/firebase-config";
import { useNavigate } from "react-router-dom";

const SignUpPageStyles = styled.div`
  min-height: 100vh;
  padding: 40px;
  .logo {
    margin: 0 auto 20px;
  }
  .heading {
    text-align: center;
    color: ${(props) => props.theme.primary};
    font-weight: bold;
    margin-bottom: 60px;
  }

  .form {
    max-width: 600px;
    margin: 0 auto;
  }
`;

const schema = yup.object({
  fullName: yup.string().required("Please enter your fullname"),
  email: yup
    .string()
    .email("Please enter your email address")
    .required("Please enter your email address"),
  password: yup
    .string()
    .min(8, "Your password must be at least 8 characters or greater")
    .required("Please enter your password"),
});

const SignUpPage = () => {
  const navigate = useNavigate();
  const {
    control,
    handleSubmit,
    formState: { errors, isValid, isSubmitting },
    watch,
    reset,
  } = useForm({
    resolver: yupResolver(schema),
    mode: "onChange",
  });
  const [togglePassword, setTogglePassword] = useState(false);
  const handleSignUp = async (values) => {
    if (!isValid) return;
    console.log("values: ", values);
    // return new Promise((resolve) => {
    //   setTimeout(() => {
    //     resolve();
    //   }, 5000);
    // });
    const user = await createUserWithEmailAndPassword(
      auth,
      values.email,
      values.password
    );

    await updateProfile(auth.currentUser, {
      displayName: values.fullName,
    });
    toast.success("Register successfully!!!");
    navigate("/");
  };

  useEffect(() => {
    const arrayErrors = Object.values(errors);
    if (arrayErrors.length > 0) {
      toast.error(arrayErrors[0]?.message, {
        pauseOnHover: false,
        delay: 0,
      });
    }
  }, [errors]);

  return (
    <SignUpPageStyles>
      <div className="container">
        <img srcSet="/logo.png" alt="monkey-blogging" className="logo" />
        <h1 className="heading">Monkey Blogging</h1>
        <form
          action=""
          className="form"
          autoComplete="off"
          onSubmit={handleSubmit(handleSignUp)}
        >
          <Field>
            <Label htmlFor="fullName" className="label">
              Fullname
            </Label>
            <Input
              name="fullName"
              type="text"
              placeholder="Enter your fullname"
              control={control}
            ></Input>
          </Field>

          <Field>
            <Label htmlFor="email" className="label">
              Email Address
            </Label>
            <Input
              name="email"
              type="text"
              placeholder="Enter your email"
              control={control}
            ></Input>
          </Field>

          <Field>
            <Label htmlFor="password" className="label">
              Password
            </Label>
            <Input
              name="password"
              type={togglePassword ? "text" : "password"}
              placeholder="Enter your password"
              control={control}
            >
              {togglePassword ? (
                <IconEyeOpen
                  onClick={() => {
                    setTogglePassword(false);
                  }}
                ></IconEyeOpen>
              ) : (
                <IconEyeClose
                  onClick={() => {
                    setTogglePassword(true);
                  }}
                ></IconEyeClose>
              )}
            </Input>
          </Field>
          <Button
            type="submit"
            style={{
              maxWidth: 300,
              margin: "0 auto",
            }}
            isLoading={isSubmitting}
            disabled={isSubmitting}
          >
            Sign Up
          </Button>
        </form>
      </div>
    </SignUpPageStyles>
  );
};

export default SignUpPage;
