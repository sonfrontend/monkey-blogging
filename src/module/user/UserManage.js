import React from "react";
import { Button } from "../../components/button";
import { Label } from "../../components/label";
import { useAuth } from "../../contexts/authContext";
import { userRole } from "../../utils/constants";
import DashboardHeading from "../dashbroad/DashboardHeading";
import UserTable from "./UserTable";

const UserManage = () => {
  const { useInfo } = useAuth();
  if (useInfo?.role !== userRole.ADMIN)
    return <Label>You must be an admin!</Label>;
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
