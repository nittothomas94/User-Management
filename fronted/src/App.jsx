import './App.css';
import { Routes, Route } from 'react-router-dom';
import Home from './pages/Home/home';
import AddUser from './pages/AddUser/addUser';
import EditUser from './pages/EditUser/editUser';
import Button from './components/Button/button';
import Footer from './components/Footer/footer';
import Input from './components/Input/input';
import Navbar from './components/Navbar/navbar';

const App = () => {
  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/add-user" element={<AddUser />} />
        <Route path="/edit-user/:id" element={<EditUser />} />
      </Routes>
    </>
  );
};

export default App;
