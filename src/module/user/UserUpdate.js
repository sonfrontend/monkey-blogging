import React, { useEffect } from "react";
import DashboardHeading from "../dashbroad/DashboardHeading";
import { useForm } from "react-hook-form";
import ImageUpload from "../../components/image/ImageUpload";
import { Field, FieldCheckboxes } from "../../components/field";
import { Label } from "../../components/label";
import { Input } from "../../components/input";
import { Radio } from "../../components/checkbox";
import { userRole, userStatus } from "../../utils/constants";
import { Button } from "../../components/button";
import useFirebaseImage from "../../hook/useFirebaseImage";
import { useSearchParams } from "react-router-dom";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import { db } from "../../firebase-app/firebase-config";
import { async } from "@firebase/util";
import { toast } from "react-toastify";
const UserUpdate = () => {
  const {
    handleSubmit,
    control,
    setValue,
    getValues,
    watch,
    reset,
    formState: { isSubmitting, isValid },
  } = useForm({
    mode: "onChange",
    defaultValues: {
      fullname: "",
      email: "",
      password: "",
      username: "",
      avatar: "",
      status: userStatus.ACTIVE,
      role: userRole.USER,
      createdAt: new Date(),
    },
  });
  const watchStatus = watch("status");
  const watchRole = watch("role");
  const imageUrl = getValues("avatar");
  const imageRegex = /%2F(\S+)\?/gm.exec(imageUrl);
  const imageName = imageRegex?.length > 0 ? imageRegex[1] : "";

  const [params] = useSearchParams();
  const userId = params.get("id");

  const {
    image,
    setImage,
    handleResetImage,
    progress,
    handleSelectImage,
    handleDeleteImage,
  } = useFirebaseImage(setValue, getValues, imageName, deleteAvatar);

  useEffect(() => {
    setImage(imageUrl);
  }, [imageUrl, setImage]);
  useEffect(() => {
    async function fetchData() {
      if (!userId) return null;
      const colRef = doc(db, "users", userId);
      const docData = await getDoc(colRef);
      console.log("docData: ", docData.data());
      reset(docData && docData.data());
    }
    fetchData();
  }, [reset, userId]);

  const handleUpdateUser = async (values) => {
    try {
      if (!isValid) return;
      const colRef = doc(db, "users", userId);
      await updateDoc(colRef, {
        ...values,
        avatar: image,
      });
      toast.success("Update user information successfully!");
    } catch (error) {
      console.log("error: ", error);
      toast.success("Update user failed!");
    }
  };

  async function deleteAvatar() {
    const colRef = doc(db, "users", userId);
    await updateDoc(colRef, {
      avatar: "",
    });
  }
  return (
    <div>
      <DashboardHeading
        title="Update user"
        desc="Add new user to system"
      ></DashboardHeading>
      <form onSubmit={handleSubmit(handleUpdateUser)}>
        <div className="w-[200px] h-[200px] mx-auto rounded-full mb-10">
          <ImageUpload
            className="!rounded-full h-full"
            onChange={handleSelectImage}
            progress={progress}
            image={image}
            handleDeleteImage={handleDeleteImage}
          ></ImageUpload>
        </div>
        <div className="form-layout">
          <Field>
            <Label>Fullname</Label>
            <Input
              name="fullName"
              placeholder="Enter your fullname"
              control={control}
            ></Input>
          </Field>
          <Field>
            <Label>Username</Label>
            <Input
              name="userName"
              placeholder="Enter your username"
              control={control}
            ></Input>
          </Field>
        </div>
        <div className="form-layout">
          <Field>
            <Label>Email</Label>
            <Input
              name="email"
              placeholder="Enter your email"
              control={control}
              type="email"
            ></Input>
          </Field>
          <Field>
            <Label>Password</Label>
            <Input
              name="password"
              placeholder="Enter your password"
              control={control}
              type="password"
            ></Input>
          </Field>
        </div>
        <div className="form-layout">
          <Field>
            <Label>Status</Label>
            <FieldCheckboxes>
              <Radio
                name="status"
                control={control}
                value={userStatus.ACTIVE}
                checked={Number(watchStatus) === userStatus.ACTIVE}
              >
                Active
              </Radio>
              <Radio
                name="status"
                control={control}
                value={userStatus.PENDING}
                checked={Number(watchStatus) === userStatus.PENDING}
              >
                Pending
              </Radio>
              <Radio
                name="status"
                control={control}
                value={userStatus.BAN}
                checked={Number(watchStatus) === userStatus.BAN}
              >
                Banned
              </Radio>
            </FieldCheckboxes>
          </Field>
          <Field>
            <Label>Role</Label>
            <FieldCheckboxes>
              <Radio
                name="role"
                control={control}
                value={userRole.ADMIN}
                checked={Number(watchRole) === userRole.ADMIN}
              >
                Admin
              </Radio>
              <Radio
                name="role"
                control={control}
                value={userRole.MOD}
                checked={Number(watchRole) === userRole.MOD}
              >
                Moderator
              </Radio>
              <Radio
                name="role"
                control={control}
                value={userRole.USER}
                checked={Number(watchRole) === userRole.USER}
              >
                User
              </Radio>
            </FieldCheckboxes>
          </Field>
        </div>
        <Button
          kind="primary"
          className="mx-auto w-[200px]"
          disabled={isSubmitting}
          isLoading={isSubmitting}
          type="submit"
        >
          Update
        </Button>
      </form>
    </div>
  );
};

export default UserUpdate;
