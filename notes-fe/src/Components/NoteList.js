import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from "react-router-dom"


import edit from '../../src/Assets/edit.svg';
import archive from '../../src/Assets/archive.svg';

export default function Example() {
  const [data, setData] = useState([]);

  useEffect(() => {
    const token = localStorage.getItem('token');
    const headers = {
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/x-www-form-urlencoded' // Use 'application/x-www-form-urlencoded' content type
    };
    const fetchData = async () => {
      try {
        const response = await axios.get('http://localhost:8080/get/notes',{
          headers: headers
        });
        setData(response.data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
    fetchData();
    console.log(data)
  }, []);

  const handleArchiveClick = async (noteId) => {
    const token = localStorage.getItem('token');
    if (noteId === null) {
      return; // Exit the function if id is null
    }
    const apiUrl = 'http://localhost:8080/archive/note?id='+noteId;
    const requestOptions = {
      method: 'PUT',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({id:noteId}),
    };
    console.log(requestOptions)
    fetch(apiUrl, requestOptions).then(setData(data.filter(note => note.id !== noteId)))
  };

  return (
    
    <>
      <div className="pt-24 pb-24">
        {data.map((note, index) => (
          <div key={index} className="flex flex-col items-center mt-4 px-4 sm:px-0">
            <div className="w-full sm:w-11/12 md:w-9/12 h-auto rounded-lg bg-black flex sm:flex-row">
          
              <div className= "flex-1 px-2 text-white w-full sm:w-6/12 m-0 py-2.5 flex flex-col justify-center items-center sm:items-start">
                <h2 className="text-2xl sm:text-3xl text-center sm:text-left">
                  {note.title}
                </h2>
                <p className="text-lg sm:text-xl text-center sm:text-left">
                  {note.content}
                </p>
                <div className='flex flex-1 w-full row justify-end'>
                  <Link to={`/editNote/${note.id}`} className="flex pr-0 ml-3" >
                    <img className="w-7 h-9" src={edit} alt="editIcon" />
                  </Link>
                  <button className="flex pr-0 ml-3" onClick={() => handleArchiveClick(note.id)}> 
                    <img className="w-7 h-9" src={archive} alt="deleteIcon" />
                  </button>
                </div>
              </div>
              
            </div>
          </div>
        ))}
      </div>
    </>
  );
}
