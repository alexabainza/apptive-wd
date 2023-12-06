import React, { useEffect } from 'react'
import Navbar from '../Navbar/Navbar'
import { useState } from 'react'
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
            
            <h3 className='text-white'>Community Notes</h3>
            </div>

    </div>
  )
}

export default GuestDashboard