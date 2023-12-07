import React, { useEffect } from 'react'
import Navbar from '../Navbar/Navbar'
import { useState } from 'react'
import CommunityNote from './CommunityNote'
const GuestDashboard = () => {
  const [notes, setNotes] = useState([])
  const [noNotesMessage, setNotesMessage] = useState(null);

  useEffect(() => {

    const fetchData = async ()=>{
      try{
        const response = await fetch("http://localhost:3000/guestDashboard");
        const data = await response.json();
        if (data.success) {
          if (data.data.length === 0) {
            setNotesMessage('No notes.');
          } else {
            console.log(data)
            setNotes(data.data);
          }
        } else {
          console.error('Error fetching notes:', data.message);
        }
      }
      catch (error) {
        console.error('Error fetching notes:', error);
      }
    }

    fetchData()

  }, []
)

  return (
    <div className='guest-dashboard-page'>
        <Navbar/>
        <div className='guest-dashboard-contents mx-5'>
            
            <h3 className='text-white mb-5'>Community Notes</h3>
            <div className = "guest-dashboard-table-header border border-white d-flex justify-content-between p-3">
              <small className='text-white w-25 text-center'>Title</small>
              <small className='text-white w-25 text-center'>Folder</small>
              <small className='text-white w-25 text-center'>Creator</small>
              <small className='text-white w-25 text-center'>Last Modified</small>

            </div>
              <div className='guest-dashboard-notes-list'>
              {notes.map((note)=>(
                <div key={note.notes_id}>
                    <CommunityNote note = {note}/>
                  </div>
              
              ))}
            </div>
            </div>

    </div>
  )
}

export default GuestDashboard