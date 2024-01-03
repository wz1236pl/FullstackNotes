import React, { useState } from 'react';
import axios from 'axios';
import { Link, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import logo2 from '../Assets/Logo.svg';

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const response = await axios.post('http://localhost:8080/auth/login', {
        email: email,
        password: password
      }, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}` // Przekazanie tokena w nagłówku
        }
      });

      if (response.data.token) {
        localStorage.setItem('token', response.data.token);
        toast.success("Zalogowano pomyślnie");
        navigate("/home");
      } else {
        toast.error("Nieprawidłowy login lub hasło");
      }
    } catch (error) {
      console.error("Błąd podczas logowania", error.response);

      if (error.response && error.response.status === 403) {
        toast.error("Nieprawidłowy login lub hasło");
      } else if (error.response && error.response.data && error.response.data.message) {
        toast.error(error.response.data.message);
      } else {
        toast.error("Wystąpił błąd podczas logowania");
      }
    }
  }

  return (
    <>
      <div className="flex min-h-screen items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
        <div className="w-full max-w-md">
          <div className="text-center">
            <Link to="/home">
              <img className="mx-auto h-12 w-auto" src={logo2} alt="Moto Moto" />
            </Link>
          </div>
          <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
            <input type="hidden" name="remember" defaultValue="true" />
            <div className="rounded-md shadow-sm">
              <div>
                <label htmlFor="email-address" className="sr-only">Email</label>
                <input
                  id="email-address"
                  name="email"
                  type="text"
                  autoComplete="email"
                  required
                  className="appearance-none rounded-lg  relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-sky-500 focus:border-sky-500 focus:z-10 sm:text-sm"
                  placeholder="Email"
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                />
              </div>
              <div className="-mt-px pt-4">
                <label htmlFor="password" className="sr-only">Hasło</label>
                <input
                  id="password"
                  name="password"
                  type="password"
                  autoComplete="current-password"
                  required
                  className="appearance-none rounded-lg  relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-sky-500 focus:border-sky-500 focus:z-10 sm:text-sm "
                  placeholder="Hasło"
                  value={password}
                  onChange={e => setPassword(e.target.value)}
                />
              </div>
            </div>
            <div className='w-32 mx-auto mt-9'>
              <button
                type="submit"
                className="group relative flex w-32 m-0 justify-center rounded-md bg-indigo-600 pt-3 pb-2 px-3 text-sm  font-semibold text-white hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                >
                ZALOGUJ
              </button>
            </div>
          </form>
        </div>
      </div>
      <ToastContainer />
    </>
  );
}
