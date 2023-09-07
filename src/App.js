import "./App.css";
import "../node_modules/bootstrap/dist/css//bootstrap.min.css";
import "../node_modules/bootstrap/dist/js/bootstrap.bundle.js";
import PrivateRoute from "./PrivateRoute";
import { Routes, Route } from "react-router-dom";
import Login from "./components/pages/login/Login.js";
import ListSpecies from "./components/pages/admin/ListSpecies.js";
import EditPage from "./components/pages/addEditForm/EditPage";
import { ToastContainer } from "react-toastify";
import UpdatePage from "./components/pages/addEditForm/UpdatePage";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Login />}></Route>

        <Route path="" element={<PrivateRoute />}>
          <Route path="/species" element={<ListSpecies />}></Route>
          <Route path="them-moi" element={<EditPage />} />
          <Route path="chi-tiet/:id" element={<UpdatePage />} />
        </Route>
      </Routes>
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
    </>
  );
}

export default App;
