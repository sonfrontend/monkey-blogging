import { doc, getDoc } from "firebase/firestore";
import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import { db } from "../../firebase-app/firebase-config";

const AuthorBox = ({ userId = "", image = "" }) => {
  const [user, setUser] = useState();
  useEffect(() => {
    async function fetchData() {
      const docRef = doc(db, "users", userId);
      const docSnapshot = await getDoc(docRef);
      if (docSnapshot.data()) {
        setUser(docSnapshot.data());
      }
    }
    fetchData();
  }, [userId]);
  if (!userId) return null;
  return (
    <div className="author">
      <div className="author-image">
        <img src={image} alt="" />
      </div>
      <div className="author-content">
        <div className="author-name">{user?.fullName}</div>
        <div className="author-desc">{user?.description}</div>
      </div>
    </div>
  );
};

export default AuthorBox;
