import { AiFillDelete, AiFillEdit } from "react-icons/ai";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import axios from "axios";

const TodoList = () => {
  const [todos, setTodos] = useState([]);
  const [isEditing, setIsEditing] = useState(false);
  const [currentTodo, setCurrentTodo] = useState({ _id: null, message: "" });

  const getAllTodos = async () => {
    try {
      const response = await axios.get("https://to-do-list-8wtb.onrender.com/todolist/getall");
      setTodos(response.data.data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    getAllTodos();
  }, []);

  const handleDelete = async (id) => {
    try {
      const result = await axios.delete(
        `https://to-do-list-8wtb.onrender.com/todolist/deleteToDo/${id}`
      );
      if (result.data.success === "deleted") {
        toast.success("Todo deleted successfully!");
        getAllTodos();
      }
    } catch (error) {
      console.error(error);
      toast.error("Failed to delete todo.");
    }
  };

  const handleEditInputChange = (e) => {
    setCurrentTodo({ ...currentTodo, message: e.target.value });
  };

  const handleEdit = (todo) => {
    setIsEditing(true);
    setCurrentTodo({ _id: todo._id, message: todo.message });
  };

  const handleUpdate = async () => {
    if (currentTodo.message.length < 4 || currentTodo.message.length > 50) {
      toast.error("Message must be between 4 and 50 characters.");
      return;
    }

    try {
      const result = await axios.put(
        `https://to-do-list-8wtb.onrender.com/todolist/updateToDo/${currentTodo._id}`,
        { message: currentTodo.message }
      );

      if (result.data.success === "updated") {
        toast.success("Todo updated successfully!");
        getAllTodos();
        setIsEditing(false);
        setCurrentTodo({ _id: null, message: "" });
      }
    } catch (error) {
      console.error(error);
      toast.error("Failed to update todo.");
    }
  };

  const handleCancelEdit = () => {
    setIsEditing(false);
    setCurrentTodo({ _id: null, message: "" });
  };

  return (
    <div className="todo-list">
      {isEditing ? (
        <div className="edit-box">
          <input
            type="text"
            value={currentTodo.message}
            onChange={handleEditInputChange}
            className="edit-input"
          />
          <button onClick={handleUpdate} className="save-btn">💾 Save</button>
          <button onClick={handleCancelEdit} className="cancel-btn">✖ Cancel</button>
        </div>
      ) : (
        <ul>
          {todos.map((todo) => (
            <li key={todo._id} className="task">
              <span className="task-text">{todo.message}</span>
              <div className="task-actions">
                <AiFillEdit
                  className="icon edit-icon"
                  onClick={() => handleEdit(todo)}
                />
                <AiFillDelete
                  className="icon delete-icon"
                  onClick={() => handleDelete(todo._id)}
                />
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default TodoList;
