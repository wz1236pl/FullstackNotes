import React, { useState, useEffect } from 'react';
import { Dialog } from '@headlessui/react';
import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline';
import logo from '../../src/Assets/Logo.svg';
import { Link, redirect } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const navigation = [
  { name: 'Strona główna', to: '/' },
  { name: 'Dodaj notatke', to: '/addNote' },
  { name: 'Archiwum', to: '/archive' },
];

const Header = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [loggedInUserEmail, setLoggedInUserEmail] = useState('');

  useEffect(() => {
    const token = localStorage.getItem('token');
    setIsLoggedIn(!!token);
    const storedEmail = localStorage.getItem('loggedInUserEmail');
    setLoggedInUserEmail(storedEmail);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('loggedInUserEmail');
    console.log('wyloguje')
    setIsLoggedIn(false);
    setLoggedInUserEmail('');
    window.location.reload();
  };

  useEffect(() => {
    if (loggedInUserEmail) {
      toast.success(`Witaj ${loggedInUserEmail}`);
    }
  }, [loggedInUserEmail]);

  return (
    <div className="container mr-auto ml-auto">
      <header className="absolute inset-x-0 top-0 z-50">
        <nav className="mx-auto flex max-w-7xl items-center justify-between p-6 lg:px-8" aria-label="Global">
          <div className="flex lg:flex-1">
            <a href="/#" className="-m-1.5 p-1.5">
              <img className="h-8 w-auto" src={logo} alt="logo"></img>
            </a>
          </div>
          <div className="flex lg:hidden">
            <button
              type="button"
              className="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-gray-700"
              onClick={() => setMobileMenuOpen(true)}
            >
              <span className="sr-only">Open main menu</span>
              <Bars3Icon className="h-6 w-6" aria-hidden="true" />
            </button>
          </div>
          <div className="hidden lg:flex lg:gap-x-12">
            {isLoggedIn ? ( navigation.map((item) => (
              <Link key={item.name} to={item.to} className="text-sm font-semibold leading-6 text-gray-900">
                {item.name}
              </Link>
            ))):
            (<p>Witaj w notatniku!</p>)}
          </div>
          <div className="hidden lg:flex lg:flex-1 lg:justify-end">
            {isLoggedIn ? (
              <>
                <button
                  onClick={handleLogout}
                  className="text-sm font-semibold leading-6 text-gray-900 pr-2"
                >
                  Wyloguj
                </button>
              </>
            ) : (
              <>
                <Link to="/login" className="text-sm font-semibold leading-6 text-gray-900 pr-2">
                  Zaloguj
                </Link>
                <Link to="/register" className="text-sm font-semibold leading-6 text-gray-900">
                  Zarejestruj
                </Link>
              </>
            )}
          </div>
        </nav>
        <Dialog as="div" className="lg:hidden" open={mobileMenuOpen} onClose={setMobileMenuOpen}>
          <div className="fixed inset-0 z-50" />
          <Dialog.Panel className="flex flex-col fixed inset-y-0 right-0 z-50 w-full overflow-y-auto bg-white px-6 py-6 sm:max-w-sm sm:ring-1 sm:ring-gray-900/10 justify-start">
            
            {isLoggedIn ? ( navigation.map((item) => (
              <Link key={item.name} to={item.to} className="text-xl font-semibold leading-6 text-gray-900">
                {item.name}
              </Link>
            ))):
            (<p></p>)}

            {isLoggedIn ? (
              <>
                <button
                  onClick={handleLogout}
                  className="text-3xl mt-4 font-semibold leading-6 text-gray-900"
                >
                  Wyloguj
                </button>
              </>
            ) : (
              <><p>Witaj w notatniku!</p>
                <Link to="/login" className="text-xl font-semibold leading-6 text-gray-900 pr-2 mt-2">
                  Zaloguj
                </Link>
                <Link to="/register" className="text-xl font-semibold leading-6 text-gray-900 mt-2">
                  Zarejestruj
                </Link>
              </>
            )}
            <button onClick={() => setMobileMenuOpen(false)} className="text-6xl mt-9 font-semibold leading-6 text-gray-900" >
              X
              </button>
          </Dialog.Panel>
        </Dialog>
      </header>
    
      <ToastContainer />
    </div>
  );
};

export default Header;
