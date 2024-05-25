import React from "react";
import { Table } from "react-bootstrap";
import { SlOptions } from "react-icons/sl";
import { CourseArray } from "../../Assets/Data/data";
import SidebarSkeleton from "../../Components/SidebarSkeleton";
import classes from "./Courses.module.css";
function Courses() {
  const tableHead = ["#", "Name", "Year", "Students ", "Status", "Action"];
  const tableWidth = ["10%", "25%", "20%", "17%", "20%", "18%"];

  return (
    <SidebarSkeleton heading={"Courses"}>
      <div className={classes.tableMain}>
        <div className={classes.table}>
          <Table responsive>
            <thead>
              <tr>
                {tableHead?.map((head, index) => (
                  <th style={{ width: tableWidth[index] }} key={index}>
                    {head}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {CourseArray.map((ele, index) => (
                <tr>
                  <td style={{ width: tableWidth[0] }} key={index}>
                    {index + 1}
                  </td>

                  <td style={{ width: tableWidth[1] }} key={index}>
                    {ele?.name}
                  </td>
                  <td style={{ width: tableWidth[2] }} key={index}>
                    {ele?.date}
                  </td>
                  <td style={{ width: tableWidth[3] }} key={index}>
                    {ele?.users}
                  </td>
                  <td style={{ width: tableWidth[4] }} key={index}>
                    {ele?.status}
                  </td>
                  <td style={{ width: tableWidth[5] }} key={index}>
                    <SlOptions />{" "}
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </div>
      </div>
    </SidebarSkeleton>
  );
}

export default Courses;
