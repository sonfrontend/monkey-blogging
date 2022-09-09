import React, { useState } from "react";
import { useForm } from "react-hook-form";
import slugify from "slugify";
import styled from "styled-components";
import { Button } from "../../components/button";
import { Radio } from "../../components/checkbox";
import { Dropdown } from "../../components/dropdown";
import { Field } from "../../components/field";
import { Input } from "../../components/input";
import { Label } from "../../components/label";
import { postStatus } from "../../utils/constants";
import {
  getStorage,
  ref,
  uploadBytesResumable,
  getDownloadURL,
  deleteObject,
} from "firebase/storage";
import ImageUpload from "../../components/image/ImageUpload";
const PostAddNewStyles = styled.div``;

const PostAddNew = () => {
  const { control, handleSubmit, watch, setValue, getValues } = useForm({
    mode: "onChange",
    defaultValues: {
      title: "",
      slug: "",
      status: 1,
      category: "",
    },
  });

  const watchStatus = watch("status");
  const watchCategory = watch("category");
  const addPostHandler = async (values) => {
    const cloneValues = { ...values };
    cloneValues.slug = slugify(values.slug || values.title);
    cloneValues.status = Number(values.status);
    handleUploadImage(cloneValues.image);
  };

  const [progress, setProgress] = useState(0);
  const [image, setImage] = useState("");
  const handleUploadImage = (file) => {
    const storage = getStorage();
    const storageRef = ref(storage, "images/" + file.name);
    const uploadTask = uploadBytesResumable(storageRef, file);
    uploadTask.on(
      "state_changed",
      (snapshot) => {
        // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
        const progressPercent =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        setProgress(progressPercent);
        switch (snapshot.state) {
          case "paused":
            console.log("Upload is paused");
            break;
          case "running":
            console.log("Upload is running");
            break;
          default:
            console.log("Nothing at all");
        }
      },
      (error) => {
        console.log("Error");
      },
      () => {
        // Upload completed successfully, now we can get the download URL
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          setImage(downloadURL);
        });
      }
    );
  };
  const onSelectImage = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    setValue("image_name", file.name);
    handleUploadImage(file);
  };

  const handleDeleteImage = () => {
    const storage = getStorage();

    // Create a reference to the file to delete
    const desertRef = ref(storage, "images/" + getValues("image_name"));

    // Delete the file
    deleteObject(desertRef)
      .then(() => {
        console.log("Remove image successfully");
        setImage("");
        setProgress(0);
      })
      .catch((error) => {
        console.log("Can not delete image");
      });
  };
  return (
    <PostAddNewStyles>
      <h1 className="dashboard-heading">Add new post</h1>
      <form onSubmit={handleSubmit(addPostHandler)}>
        <div className="grid grid-cols-2 gap-x-10 mb-10">
          <Field>
            <Label>Title</Label>
            <Input
              control={control}
              placeholder="Enter your title"
              name="title"
            ></Input>
          </Field>
          <Field>
            <Label>Slug</Label>
            <Input
              control={control}
              placeholder="Enter your slug"
              name="slug"
            ></Input>
          </Field>
        </div>
        <div className="grid grid-cols-2 gap-x-10 mb-10">
          <Field>
            <Label>Image</Label>
            <ImageUpload
              onChange={onSelectImage}
              progress={progress}
              image={image}
              className="h-[250px]"
              handleDeleteImage={handleDeleteImage}
            ></ImageUpload>
          </Field>
          <Field>
            <Label>Status</Label>
            <div className="flex items-center gap-x-5">
              <Radio
                name="status"
                control={control}
                value={postStatus.APPROVED}
                checked={Number(watchStatus) === postStatus.APPROVED}
              >
                Approved
              </Radio>
              <Radio
                name="status"
                control={control}
                value={postStatus.PENDING}
                checked={Number(watchStatus) === postStatus.PENDING}
              >
                Pending
              </Radio>
              <Radio
                name="status"
                control={control}
                value={postStatus.REJECTED}
                checked={Number(watchStatus) === postStatus.REJECTED}
              >
                Reject
              </Radio>
            </div>
          </Field>
          <Field>
            <Label>Author</Label>
            <Input control={control} placeholder="Find the author"></Input>
          </Field>
        </div>
        <div className="grid grid-cols-2 gap-x-10 mb-10">
          <Field>
            <Label>Category</Label>
            <Dropdown>
              <Dropdown.Option>Knowledge</Dropdown.Option>
              <Dropdown.Option>Blockchain</Dropdown.Option>
              <Dropdown.Option>Setup</Dropdown.Option>
              <Dropdown.Option>Nature</Dropdown.Option>
              <Dropdown.Option>Developer</Dropdown.Option>
            </Dropdown>
          </Field>
          <Field></Field>
        </div>
        <Button kind="primary" type="submit" className="mx-auto">
          Add new post
        </Button>
      </form>
    </PostAddNewStyles>
  );
};

export default PostAddNew;
