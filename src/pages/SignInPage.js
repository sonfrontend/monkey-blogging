import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { Navigate, NavLink, useNavigate } from "react-router-dom";
import { Button } from "../components/button";
import { Field } from "../components/field";
import { Input } from "../components/input";
import { Label } from "../components/label";
import { useAuth } from "../contexts/authContext";
import AuthenticationPage from "./AuthenticationPage";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { ToastContainer, toast } from "react-toastify";
import { IconEyeClose, IconEyeOpen } from "../components/icon";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase-app/firebase-config";
import { async } from "@firebase/util";

const schema = yup.object({
  email: yup
    .string()
    .email("Please enter your email address")
    .required("Please enter your email address"),
  password: yup
    .string()
    .min(8, "Your password must be at least 8 characters or greater")
    .required("Please enter your password"),
});

const SignInPage = () => {
  const [togglePassword, setTogglePassword] = useState(false);

  const {
    handleSubmit,
    control,
    isSubmitting,

    formState: { errors, isValid },
  } = useForm({
    mode: "onChange",
    resolver: yupResolver(schema),
  });

  useEffect(() => {
    const arrayErrors = Object.values(errors);
    if (arrayErrors.length > 0) {
      toast.error(arrayErrors[0]?.message, {
        pauseOnHover: false,
        delay: 0,
      });
    }
  }, [errors]);

  const { userInfo } = useAuth();
  const navigate = useNavigate();
  useEffect(() => {
    document.title = "Login Page ";
    if (userInfo?.email) navigate("/");
  }, []);
  const handleSignIn = async (values) => {
    if (!isValid) return;
    await signInWithEmailAndPassword(auth, values.email, values.password);
    navigate("/");
  };

  return (
    <AuthenticationPage>
      <form
        action=""
        className="form"
        autoComplete="off"
        onSubmit={handleSubmit(handleSignIn)}
      >
        <Field>
          <Label htmlFor="email">Email Address</Label>
          <Input
            type="email"
            name="email"
            placeholder="Enter your email address"
            control={control}
          ></Input>
        </Field>

        <Field>
          <Label htmlFor="password">Password</Label>
          <Input
            name="password"
            placeholder="Enter your password"
            type={togglePassword ? "text" : "password"}
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
        <div className="have-account">
          You have not have an account?{" "}
          <NavLink to={"/sign-up"}>Register ac account</NavLink>
        </div>
        <Button
          type="submit"
          kind="primary"
          style={{
            width: "100%",
            maxWidth: 300,
            margin: "0 auto",
          }}
          isLoading={isSubmitting}
          disabled={isSubmitting}
        >
          Sign In
        </Button>
      </form>
    </AuthenticationPage>
  );
};

export default SignInPage;
