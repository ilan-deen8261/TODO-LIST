import axios from "axios";
import React, { useState } from "react";
import { toast } from "react-toastify";
import './Addtodo.css'

const Addtodo = () => {
  const [message, setMessage] = useState("");

  const createToDo = async () => {
    if (message === "") {
      toast.error("Cannot add an empty message");
      return;
    }

    if (message.length < 4 || message.length > 50) {
      toast.error("Message must be between 4 and 50 characters");
      return;
    }

    try {
      const response = await axios.post("https://to-do-list-8wtb.onrender.com/todolist/", {
        message: message,
      });

      if (response.data.success === "created") {
        toast.success("Task added successfully 🚀");
        setMessage(""); // Clear input instead of reload
      }
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong!");
    }
  };

  return (
    <div className="addtodo-container">
      <input
        type="text"
        value={message}
        placeholder="✍️ Add a new task..."
        onChange={(e) => setMessage(e.target.value)}
        className="todo-input"
      />

      <button onClick={createToDo} className="add-btn">
        ➕ Add
      </button>
    </div>
  );
};

export default Addtodo;
