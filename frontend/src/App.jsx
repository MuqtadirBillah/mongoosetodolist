import logo from './logo.svg';
import './App.css';
import { ToastContainer, toast } from 'react-toastify';
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import Login from './Components/Login';
import Register from './Components/Register';
import ResetPassword from './Components/ResetPassword';
import UserData from './Components/UsersData';
import Folders from './Components/Folders';
import FolderView from './Components/FolderView';

function App() {
  return (
    <div className="">
      <ToastContainer
        position="bottom-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
      <Router>
        <Routes>
          <Route  path="/"  element={<Login />} />
          <Route  path="/register" element={<Register />} />
          <Route  path="/reset-password" element={<ResetPassword />} />
          <Route  path="/users" element={<UserData />} />
          <Route  path="/folders" element={<Folders />} />
          <Route path="/folder/view/:id" element={<FolderView />} />
          {/* <Route  path="*"  element={<PageNotFound />} /> */}
        </Routes>
      </Router>
    </div>
  );
}

export default App;
