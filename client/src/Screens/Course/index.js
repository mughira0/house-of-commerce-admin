import React, { useEffect, useState } from "react";
import { Table } from "react-bootstrap";
import { SlOptions } from "react-icons/sl";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import { CourseArray } from "../../Assets/Data/data";
import { Delete, Get, Patch, Post } from "../../AxiosFunction/AxiosFunction";
import AreYouSureModal from "../../Components/AreYouSureModal";
import Button from "../../Components/Button/Button";
import SimplePopper from "../../Components/Popper";
import SidebarSkeleton from "../../Components/SidebarSkeleton";
import TableSkeletons from "../../Components/TableSkeleton";
import { BaseUrl, recordLimit } from "../../Config/apiUrl";
import AddEditCourseModal from "../../Modals/AddEditCourseModal";
import classes from "./Courses.module.css";

function Courses() {
  const { token } = useSelector((state) => state?.authReducer);
  const tableHead = ["#", "Name", "Year", "Students ", "Status", "Action"];
  const tableWidth = ["10%", "25%", "20%", "17%", "20%", "18%"];
  const [selectedItem, setSelectedItem] = useState(null);
  const [anchorEl, setAnchorEl] = useState(null);
  const [loading, setLoading] = useState(false);
  const [courseModal, setCourseModal] = useState({ load: false, open: false });
  const [page, setPage] = useState(1);
  const [count, setCount] = useState(0);
  const [data, setData] = useState(CourseArray);
  const [isOpen, setIsOpen] = useState(Boolean(anchorEl));
  const [deleteModal, setDeleteModal] = useState({ open: false, load: false });
  const [filter, setFilter] = useState(null);
  const handleClick = (event) => {
    event.stopPropagation();
    setAnchorEl(event.currentTarget);
    if (!isOpen) {
      setIsOpen((prevOpen) => !prevOpen);
    }
  };
  const handleAddEditCourse = async (body, flag) => {
    setCourseModal((prev) => ({ ...prev, load: true }));
    let url = BaseUrl("course/create");
    const response = flag
      ? await Patch(url, body, token)
      : await Post(url, body, token);
    if (response?.data) {
      setData((prev) => {
        if (selectedItem) {
          return prev?.map((e) =>
            e._id == selectedItem._id ? response.data?.data : e
          );
        }

        return [...prev, response.data?.data];
      });
      toast.success(
        flag ? "Course Updated Successfully" : "Course Added Successfully"
      );
      setCourseModal((prev) => ({ ...prev, load: false, open: false }));
    }
    setCourseModal((prev) => ({ ...prev, load: false }));
  };

  const handleAction = (item) => {
    if (item == "Edit") {
      setCourseModal((prev) => ({ ...prev, open: true }));
    }
    if (item == "Delete") {
      setDeleteModal((prev) => ({ ...prev, open: true }));
    }
  };
  const handleDelete = async () => {
    setDeleteModal((prev) => ({ ...prev, load: true }));
    const response = await Delete(
      BaseUrl(`course/${selectedItem?._id}`),
      token
    );
    if (response?.data) {
      setData((prev) => prev?.filter((e) => e?._id != selectedItem?._id));
      setDeleteModal((prev) => ({ ...prev, load: false, open: false }));
      toast.success("Course Deleted Successfully");
    }
    setDeleteModal((prev) => ({ ...prev, load: false }));
  };
  const handleGetAllCourses = async (pageNo = page) => {
    setLoading(true);
    const response = await Get(
      BaseUrl(`course/all?limit=${recordLimit}&page=${pageNo}`),
      token
    );
    if (response?.data) {
      setData(response?.data?.data?.courses);
      setCount(response?.data?.data?.totalCount);
    }
    setLoading(false);
  };
  useEffect(() => {
    setPage(1);
    handleGetAllCourses(1);
  }, []);
  return (
    <SidebarSkeleton heading={"Courses"}>
      <div className={classes.pageMain}>
        <div className={classes.header}>
          <Button
            label={"Add Course"}
            onClick={() => {
              setCourseModal((prev) => ({ ...prev, open: true }));
              setSelectedItem(null);
            }}
          />
        </div>
        <div
          onClick={() => {
            setIsOpen(false);
          }}
          className={classes.tableMain}
        >
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
                {loading ? (
                  <TableSkeletons colCount={6} rowsCount={5} />
                ) : (
                  data.map((ele, index) => (
                    <tr key={index}>
                      <td style={{ width: tableWidth[0] }}>{index + 1}</td>
                      <td style={{ width: tableWidth[1] }}>{ele?.name}</td>
                      <td style={{ width: tableWidth[2] }}>{ele?.year}</td>
                      <td style={{ width: tableWidth[3] }}>
                        {ele?.students?.length}
                      </td>
                      <td style={{ width: tableWidth[4] }}>{ele?.status}</td>
                      <td style={{ width: tableWidth[5] }}>
                        <SlOptions
                          onClick={(event) => {
                            setSelectedItem(ele);
                            handleClick(event);
                          }}
                        />
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </Table>
            <SimplePopper
              options={["Edit", "Delete"]}
              open={isOpen}
              anchorEl={anchorEl}
              handleClick={handleAction}
            />
          </div>
        </div>
      </div>
      {courseModal?.open && (
        <AddEditCourseModal
          data={selectedItem}
          show={courseModal?.open}
          setShow={(e) => {
            setCourseModal((prev) => ({ ...prev, open: e }));
          }}
          apiCall={courseModal?.load}
          onClick={handleAddEditCourse}
        />
      )}

      {deleteModal?.open && (
        <AreYouSureModal
          show={deleteModal?.open}
          setShow={(e) => {
            setDeleteModal((prev) => ({ ...prev, open: e }));
          }}
          apiCall={deleteModal?.load}
          onClick={handleDelete}
        />
      )}
    </SidebarSkeleton>
  );
}

export default Courses;
