import React from "react";
import SidebarSkeleton from "../../Components/SidebarSkeleton";
import classes from "./landing.module.css";
function Courses() {
  return (
    <SidebarSkeleton>
      <div className={classes.pageMain}></div>
    </SidebarSkeleton>
  );
}

export default Courses;
