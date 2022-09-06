import React, { Fragment, useState } from "react";
import { IconEyeClose, IconEyeOpen } from "../icon";
import Input from "./Input";

const InputPasswordToggle = ({ control }) => {
  const [togglePassword, setTogglePassword] = useState(false);
  if (!control) return null;
  return (
    <Fragment>
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
    </Fragment>
  );
};

export default InputPasswordToggle;
