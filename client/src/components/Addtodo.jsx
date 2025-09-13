import axios from 'axios';
import React, { useState } from 'react'
import { toast } from 'react-toastify';

const Addtodo = () => {
    const [message, setMessage]= useState('');

    const createToDo = async () => {
        // Validate message
        if (message === '') {
            toast.error('cannot add an empty message');
            return;
        }

        if (message.length < 4 || message.length > 20) {
            toast.error('Message must be between 4 and 20 characters');
            return;
        }

        try {
            const response = await axios.post('http://localhost:5000/todolist/', {
                message:message,
            });
        if (response.data.success === 'created') {
            window.location.reload();
        }
        }catch (error) {
            console.log(error)
        }
    };

  return (
    <div className="container">
        {/* {input for message} */}
        <input
        type="text"
        placeholder="Add task here"
        onChange={(e) => setMessage (e.target.value)}
        />
        
      {/* Add button */}
      <button onClick={createToDo} className="btn">ADD</button>
      
    </div>
  )
}

export default Addtodo
