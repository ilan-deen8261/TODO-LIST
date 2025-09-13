import Addtodo from "./components/Addtodo";
import Header from "./components/Header";
import './App.css';
import TodoList from "./components/TodoList";
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from 'react-toastify';

const App = () => {
  return (
    <div>
      <Header/>
      <Addtodo/>
      <TodoList/>
      <ToastContainer/>
    </div>
  )
}

export default App
