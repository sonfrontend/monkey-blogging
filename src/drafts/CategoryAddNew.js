import DashboardHeading from "module/dashboard/DashboardHeading";
import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { Button } from "../components/button";
import { Radio } from "../components/checkbox";
import { Field, FieldCheckboxes } from "../components/field";
import { Input } from "../components/input";
import { Label } from "../components/label";

const CategoryAddNew = () => {
  const { control, handleSubmit } = useForm({
    mode: "onChange",
    defaultValues: {
      title: "",
      slug: "",
      status: 1,
      createdAt: new Date(),
    },
  });

  useEffect(() => {
    console.log("Componemt CategoryAddNew");
  }, []);
  return (
    <div>
      <DashboardHeading
        title="New category"
        desc="Add new category"
      ></DashboardHeading>
      <form>
        <div className="form-layout">
          <Field>
            <Label>Name</Label>
            <Input
              control={control}
              name="name"
              placeholder="Enter your category name"
            ></Input>
          </Field>
          <Field>
            <Label>Slug</Label>
            <Input
              control={control}
              name="slug"
              placeholder="Enter your slug"
            ></Input>
          </Field>
        </div>
        <div className="form-layout">
          <Field>
            <Label>Status</Label>
            <FieldCheckboxes>
              <Radio name="status" control={control} checked>
                Approved
              </Radio>
              <Radio name="status" control={control}>
                Unapproved
              </Radio>
            </FieldCheckboxes>
          </Field>
        </div>
        <Button kind="primary" className="mx-auto" type="submit">
          Add new category
        </Button>
      </form>
    </div>
  );
};

export default CategoryAddNew;
