import React, { useEffect, useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Header from './Header';
import ArchiveList from './ArchiveList';

const Archive = () => {
  const [loggedInUserEmail, setLoggedInUserEmail] = useState('');

  useEffect(() => {
    const storedEmail = localStorage.getItem('loggedInUserEmail');
    document.title = 'Notatnik'

    if (storedEmail) {
      setLoggedInUserEmail(storedEmail);
      toast.success(`Witaj ${storedEmail}`);
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('loggedInUserEmail');
    setLoggedInUserEmail('');
  };

  return (
    <div>
      <Header />
      <ArchiveList />
      {loggedInUserEmail && (
        <button onClick={handleLogout}>Wyloguj</button>
      )}
      <ToastContainer />
    </div>
  );
}

export default Archive;
