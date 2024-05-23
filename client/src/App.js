import React, { lazy, Suspense } from "react";
import "react-phone-input-2/lib/style.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "../node_modules/bootstrap/dist/css/bootstrap.min.css";
import "../node_modules/react-toastify/dist/ReactToastify.css";
import "./App.css";
import Loader from "./Components/Loader";
import BeforeLoginRoute from "./Helper/BeforeLoginRoute";
import ProtectedRoute from "./Helper/ProtectedRoute";

const Login = lazy(() => import("./Screens/Login"));
const Signup = lazy(() => import("./Screens/Signup"));
const Landing = lazy(() => import("./Screens/landing"));
const Courses = lazy(() => import("./Screens/Courses"));

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
            <Route
              path="/"
              exact
              element={<ProtectedRoute file={<Landing />} />}
            />
            <Route
              path="/courses"
              exact
              element={<ProtectedRoute file={<Courses />} />}
            />
            {/* // <Route path="*" exact element={<Landing />} /> */}
            {/* <Route
              path="/contact"
              exact
              element={<ProtectedRoute file={<Contact />} />}
            />
            <Route path="*" exact element={<Landing />} /> */}
          </Routes>
        </Router>
      </Suspense>
    </>
  );
}

export default App;
