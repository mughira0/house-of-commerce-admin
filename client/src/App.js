import React, { lazy, Suspense } from "react";
import "react-phone-input-2/lib/style.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "../node_modules/bootstrap/dist/css/bootstrap.min.css";
import "../node_modules/react-toastify/dist/ReactToastify.css";
import "./App.css";
import Loader from "./Components/Loader";
import BeforeLoginRoute from "./Helper/BeforeLoginRoute";

const Login = lazy(() => import("./Screens/Login"));
const Signup = lazy(() => import("./Screens/Signup"));
const Dashboard = lazy(() => import("./Screens/Dashboard"));
const Courses = lazy(() => import("./Screens/Course"));

function App() {
  return (
    <>
      <ToastContainer />

      <Suspense fallback={<Loader />}>
        <Router>
          <Routes>
            {/* without login */}
            <Route
              path="/login"
              exact
              element={<BeforeLoginRoute file={<Login />} />}
            />
            <Route
              path="/signup"
              exact
              element={<BeforeLoginRoute file={<Signup />} />}
            />
            <Route path="/" exact element={<Dashboard />} />
            <Route path="/courses" exact element={<Courses />} />
            {/* <Route
              path="/courses"
              exact
              element={<ProtectedRoute file={<Courses />} />}
            /> */}
          </Routes>
        </Router>
      </Suspense>
    </>
  );
}

export default App;
