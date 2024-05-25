import React from "react";
import SidebarSkeleton from "../../Components/SidebarSkeleton";
import classes from "./landing.module.css";
function Dashboard() {
  return (
    <SidebarSkeleton heading={"Dashboard"}>
      <div className={classes.pageMain}></div>
    </SidebarSkeleton>
  );
}

export default Dashboard;
