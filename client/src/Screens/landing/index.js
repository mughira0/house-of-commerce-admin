import React from "react";
import SidebarSkeleton from "../../Components/SidebarSkeleton";
import classes from "./landing.module.css";
function Landing() {
  return (
    <SidebarSkeleton>
      <div className={classes.pageMain}></div>
    </SidebarSkeleton>
  );
}

export default Landing;
