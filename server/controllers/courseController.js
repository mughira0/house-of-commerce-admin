import courseModel from "../models/Course.js";
export const handleCreateCourse = async (req, res) => {
  try {
    const { name, year } = req.body;
    if (!name || !year) {
      return res.status(400).send({
        status: false,
        message: "Please fill all the fields",
      });
    }
    let courseFound = await course.findOne({ name, year });
    if (courseFound) {
      return res.status(400).send({
        status: false,
        message: "Course already exists",
      });
    }

    const newCourse = await courseModel.create({
      name,
      year,
    });
    res.status(200).send({
      status: true,
      message: "Course created successfully",
      data: newCourse,
    });
  } catch (err) {
    res.status(500).send({
      status: false,
      error: err,
    });
  }
};

export const handleEditCourse = async (req, res) => {
  try {
    const { name, year, courseId } = req.body;
    if (!courseId) {
      return res.status(400).send({
        status: false,
        message: "Please send course id",
      });
    }

    if (!name || !year) {
      return res.status(400).send({
        status: false,
        message: "Please fill all the fields",
      });
    }
    let courseFound = await courseModel.findOne({ _id: courseId });
    if (!courseFound) {
      return res.status(400).send({
        status: false,
        message: "Invalid course id",
      });
    }
    const updatedCourse = await courseModel.findByIdAndUpdate(
      courseFound._id,
      {
        name,
        year,
      },
      { new: true }
    );
    res.status(200).send({
      status: true,
      message: "Course updated successfully",
      data: updatedCourse,
    });
  } catch (err) {
    res.status(500).send({
      status: false,
      error: err,
    });
  }
};

export const handleDeleteCourse = async (req, res) => {
  try {
    const courseId = req.param.id;

    let courseFound = await courseModel.findOne({ _id: courseId });
    if (!courseFound) {
      return res.status(400).send({
        status: false,
        message: "Invalid course id",
      });
    }
    const deletedCourse = await courseModel.findByIdAndDelete(req.param.id);
    res.status(200).send({
      status: true,
      message: "Course deleted successfully",
    });
  } catch (err) {
    res.status(500).send({
      status: false,
      error: err,
    });
  }
};

export const handleGetAllCourses = async (req, res) => {
  try {
    const courses = await courseModel.find();
    res.status(200).send({
      status: true,
      data: courses,
    });
  } catch (err) {
    res.status(500).send({
      status: false,
      error: err,
    });
  }
};
