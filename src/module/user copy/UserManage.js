import React from "react";
import { Button } from "../../components/button";
import DashboardHeading from "../dashbroad/DashboardHeading";
import UserTable from "./UserTable";

const UserManage = () => {
  return (
    <div>
      <DashboardHeading
        title="Users"
        desc="Manage your user"
      ></DashboardHeading>
      <div className="flex justify-end mb-10">
        <Button kind="ghost" to="/manage/add-user">
          Add new user
        </Button>
      </div>
      <UserTable></UserTable>
    </div>
  );
};

export default UserManage;
