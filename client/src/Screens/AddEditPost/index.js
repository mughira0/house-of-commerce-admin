import React from "react";
import { useSelector } from "react-redux";

function AddEditPost() {
  const { user } = useSelector((state) => state?.authReducer);
  return (
    <div className={classes.main}>
      <div className={classes._header}>
        <div className={classes.profile}>
          <img src={user?.profilePic} />
        </div>
      </div>
    </div>
  );
}

export default AddEditPost;
