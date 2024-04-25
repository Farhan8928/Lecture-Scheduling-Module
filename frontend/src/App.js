import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Navbar from './components/NavBar'; // Import the Navbar component
import { ToastContainer } from 'react-toastify'; // Import ToastContainer
import 'react-toastify/dist/ReactToastify.css'; // Import the CSS for react-toastify
import AdminPanel from './components/admin/AdminPanel';
import InstructorPanel from './components/instructure/InstructorPanel';
import InstructorList from './components/admin/InstructorList';
import CourseForm from './components/admin/CourseForm';
import LectureForm from './components/admin/LectureForm';
import AssignedLecturesList from './components/admin/AssignedLecturesList';
import HomePage from './components/HomePage';
import NewInstructor from './components/admin/NewInstructor';

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <Navbar /> {/* Include the Navbar component */}
        <ToastContainer /> {/* Include the ToastContainer */}
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/admin" element={<AdminPanel />} />
          <Route path="/admin/instructors" element={<InstructorList />} />
          <Route path="/admin/add-course" element={<CourseForm />} />
          <Route path="/admin/add-lecture" element={<LectureForm />} /> 
          <Route path="/admin/assigned-lectures" element={<AssignedLecturesList />} />
          <Route path="/admin/new-instructor" element={<NewInstructor />} />
          <Route path="/instructor" element={<InstructorPanel />} />
          {/* Add more routes as needed */}
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
