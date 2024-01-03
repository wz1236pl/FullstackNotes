import React, {useEffect, useState} from 'react';
import axios from 'axios';
import { Link, useNavigate, useParams } from "react-router-dom"

import logo2 from '../Assets/Logo.svg'
import Header from './Header';

function EditNote() {
  const navigate = useNavigate();

  const {id} = useParams();

  const [values, setValues] = useState({
    id: id,
    title : '',
    content : ''
    })

    useEffect(()=> {
        axios.get('http://localhost:8080/get/note?id='+id).then(
            res => {setValues({...values,
            id: res.data.id,
            title : res.data.title,
            content : res.data.content})
        })}, [])

  const handleSubmit = async (event) => {
    event.preventDefault();
    const token = localStorage.getItem('token');
    const headers = {
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/x-www-form-urlencoded' // Use 'application/x-www-form-urlencoded' content type
    };

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
      console.log(token)
      const response = await axios.put('http://localhost:8080/update/note', serializedData, {
        headers: headers
      });
      // Handle response
      console.log(response.status);
      navigate('/home'); // Navigate to '/home' after form submission
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <><Header/>
      <div className="flex place-content-stretch min-h-screen w-full w-min-full items-center justify-center py-12 px-4 sm:px-6 lg:px-8" >
        <div className="w-full max-w-md space-y-8">
          <div>

            <Link to="/home"><img className="mx-auto h-12 w-auto" src={logo2} alt="Notatnik" /></Link>

          </div>
          <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
            <input type="hidden" name="remember" defaultValue="true" />
            <input type="text" id="id" name="id" class="invisible" required value={values.id}/>
            <div className="-space-y-px rounded-md ">

            <input
                  id="title"
                  name="title"
                  type="text"
                  autoComplete="title"
                  required
                  value={values.title}
                  onChange={e => setValues({...values, title: e.target.value})}
                  className="relative block w-full rounded-lg border-0 py-1.5  text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:z-10 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 
                  placeholder:italic placeholder:text-slate-400 block bg-white w-full border border-slate-300 rounded-md py-2 pl-2 pr-3 shadow-sm focus:outline-none focus:border-sky-500 focus:ring-sky-500 focus:ring-1 sm:text-sm"
                   placeholder="Tytuł notatki"
                />
              </div>
              
              <div className='pt-8'>
                <label htmlFor="content" >
                  Treść
                </label>
                <textarea className="relative block w-full rounded-lg border-0 py-1.5  text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:z-10 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 
                  placeholder:text-slate-400 block bg-white w-full border border-slate-300 rounded-md py-2 pl-2 pr-3 shadow-sm focus:outline-none focus:border-sky-500 focus:ring-sky-500 focus:ring-1 sm:text-sm"
                  placeholder="Treść notatki" name="content" rows="10" cols="50"
                  value={values.content}
                  onChange={e => setValues({...values, content: e.target.value})}
                  ></textarea>
              </div>
            <div>
              <button
                type="submit"
                className="group relative flex w-38 justify-center mx-auto rounded-md bg-indigo-600 py-2 px-7 text-sm font-semibold text-white hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              >
                Aktualizuj notatkę
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  )
}
export default EditNote;