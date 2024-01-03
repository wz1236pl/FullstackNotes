import React from 'react';
import axios from 'axios';
import { Link, useNavigate } from "react-router-dom"

import logo2 from '../Assets/Logo.svg'

export default function Example() {
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();

    // Serialize the form data
    const formData = new FormData(event.target);
    const formObject = {};
    formData.forEach((value, key) => {
      formObject[key] = value;
    });
    const serializedData = Object.entries(formObject)
      .map(([key, value]) => `${encodeURIComponent(key)}=${encodeURIComponent(value)}`)
      .join('&');

    try {
      const response = await axios.post('http://localhost:8080/auth/register', serializedData);
      // Handle response
      console.log(response.status);
      navigate('/login'); // Navigate to '/home' after form submission
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <div className="flex min-h-screen items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
        <div className="w-full max-w-md space-y-8">
          <div>
            <Link to="/home"><img className="mx-auto h-12 w-auto" src={logo2} alt="Moto Moto" /></Link>

          </div>
          <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
            <input type="hidden" name="remember" defaultValue="true" />
            <div className="-space-y-px rounded-md shadow-sm">
              <div >
                <label htmlFor="email-address" >
                  Email
                </label>
                <input
                  id="email-address"
                  name="email"
                  type="email"
                  autoComplete="email"
                  required
                  className="relative block w-full rounded-lg border-0 py-1.5 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:z-10 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 placeholder:text-gray-400 focus:z-10 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 
                    placeholder:italic placeholder:text-slate-400 block bg-white w-full border border-slate-300 rounded-md py-2 pl-2 pr-3 shadow-sm focus:outline-none focus:border-sky-500 focus:ring-sky-500 focus:ring-1 sm:text-sm" placeholder="Email"
                />
              </div>
              <div className='pt-4'>
                <label htmlFor="password">
                  Hasło
                </label>
                <input
                  id="password"
                  name="password"
                  type="password"
                  autoComplete="current-password"
                  required
                  className="relative block w-full rounded-lg border-0 py-1.5 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:z-10 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 placeholder:text-gray-400 focus:z-10 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 
                    placeholder:italic placeholder:text-slate-400 block bg-white w-full border border-slate-300 rounded-md py-2 pl-2 pr-3 shadow-sm focus:outline-none focus:border-sky-500 focus:ring-sky-500 focus:ring-1 sm:text-sm" placeholder="Hasło"
                />
              </div>

              <div className='pt-4'>
                <label htmlFor="password" >
                  Powtórz hasło
                </label>
                <input
                  id="password2"
                  name="password2"
                  type="password"
                  autoComplete="current-password"
                  required
                  className="relative block w-full rounded-lg border-0 py-1.5 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:z-10 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 placeholder:text-gray-400 focus:z-10 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 
                    placeholder:italic placeholder:text-slate-400 block bg-white w-full border border-slate-300 rounded-md py-2 pl-2 pr-3 shadow-sm focus:outline-none focus:border-sky-500 focus:ring-sky-500 focus:ring-1 sm:text-sm" placeholder="Hasło"
                />
              </div>

            </div>
            <div>
              <div className='w-32 mx-auto mt-9' >
                <button
                  type="submit"
                  className="group relative flex w-32 m-0 justify-center rounded-md bg-indigo-600 pt-3 pb-2 px-3 text-sm  font-semibold text-white hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                >

                  Zarejestruj
                </button>

              </div>
            </div>
          </form>
        </div>
      </div>
    </>
  )
}
