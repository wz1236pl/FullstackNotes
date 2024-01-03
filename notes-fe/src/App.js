import React from 'react';
import { Routes, Route } from "react-router-dom";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Home from './Components/Home';
import RegisterForm from '../src/Components/RegisterForm';
import LoginForm from '../src/Components/LoginForm';
import NoteList from './Components/NoteList';
import AddNote from './Components/AddNote';
import EditNote from './Components/EditNote';
import Archive from './Components/Archive';

function App() {
  return (
    <>
      <ToastContainer />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/register" element={<RegisterForm />} />
        <Route path="/login" element={<LoginForm />} />
        <Route path="/Home" element={<Home />} />
        <Route path="/AddNote" element={<AddNote />} />
        <Route path="/NoteList" element={<NoteList />} />
        <Route path="/EditNote/:id" element={<EditNote />} />
        <Route path="/Archive" element={<Archive />} />
      </Routes>
    </>
  );
}

export default App;
