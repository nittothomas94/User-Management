import './home.css';
import Navbar from '../../components/Navbar/navbar';
import Input from '../../components/Input/input';
import Button from '../../components/Button/button';
import { useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import axios from 'axios';
import { jsPDF } from 'jspdf';
import html2canvas from 'html2canvas';
import Modal from '../../components/Modal/Modal';

const Home = () => {
  const [users, setUsers] = useState([]);
  const navigate = useNavigate();
  const [ShowDeleteModal, setDeleteModal] = useState(false);
  const [selectedUserId, setSelectedUserId] = useState(null);
  const [name, setName] = useState('');

  useEffect(() => {
    getAllUsers();
  }, []);

  const getAllUsers = async () => {
    const response = await axios.get('http://localhost:3000/api/users');
    setUsers(response.data);
  };

  console.log(users);

  const onDownloadClick = async item => {
    const doc = new jsPDF();
    let y = 10;
    const imageUrl = item.image;
    if (imageUrl) {
      try {
        const imgData = await getBase64FromUrl(imageUrl);
        doc.addImage(imgData, 'JPEG', 10, y, 50, 50);
        y += 60;
      } catch (error) {
        console.error('Error loading image:', error);
      }
    }
    // Add Text Details
    doc.setFontSize(16);
    doc.text('Booking Details', 10, y);
    y += 10;

    doc.setFontSize(12);
    doc.text(`Name: ${item.name}`, 10, y);
    y += 10;
    doc.text(`Email: ${item.email}`, 10, y);
    y += 10;
    doc.text(`Age: ${item.age}`, 10, y);
    y += 10;
    doc.text(`Role: ${item.role}`, 10, y);
    y += 10;
    doc.text(`City: ${item.city}`, 10, y);
    y += 10;
    doc.text(`State: ${item.state}`, 10, y);
    y += 10;

    doc.save(`Booking_${item._id}.pdf`);
  };

  // Function to fetch image and convert to Base64
  const getBase64FromUrl = async url => {
    const response = await fetch(url);
    const blob = await response.blob();
    return new Promise(resolve => {
      const reader = new FileReader();
      reader.readAsDataURL(blob);
      reader.onloadend = () => resolve(reader.result);
    });
  };

  //ADD

  const onAddUserClick = () => {
    navigate('/add-user');
  };

  // EDIT
  const onEditClick = async id => {
    navigate('/edit-user/' + id);
  };

  // DELETE

  const onDeleteClick = id => {
    setSelectedUserId(id);
    setDeleteModal(true);
  };

  const coverClcikFunction = () => {
    setDeleteModal(false);
  };

  const onDeleteUser = async () => {
    const response = await axios.delete(
      'http://localhost:3000/api/users/' + selectedUserId
    );
    getAllUsers();
    setDeleteModal(false);
  };

  //Search

  const onInputChange = e => {
    setName(e.target.value);
  };
  console.log(name);

  const onOkButtonClick = async () => {
    const response = await axios.get(
      'http://localhost:3000/api/users?name=' + name
    );

    console.log(response.data);
    setUsers(response.data);
  };

  return (
    <>
      <Navbar />
      <Modal
        show={ShowDeleteModal}
        coverClick={coverClcikFunction}
        YseDelete={onDeleteUser}
      />
      <div className="home-container">
        {/* Top Section */}

        <div className="userMagement-search">
          <div className="user-mananagement-heading">
            <h1>User Management</h1>
            <p>users images,name,email,age,role</p>
          </div>
          <div className="search-adduser">
            <div className="search-input-div">
              <i className="material-icons search-icon">search</i>
              <Input
                className="search-input"
                placeholder="Search By Name"
                onChange={onInputChange}
              />
              <Button
                className="ok-button"
                content="ok"
                onClick={onOkButtonClick}
              />
            </div>
            <Button
              className="add-user-button"
              content="Add User"
              onClick={onAddUserClick}
            />
          </div>
        </div>

        {/* Bottom Section */}

        <div className="users-div">
          <div className="users-div-headings">
            <h1>Image</h1>
            <h1>Name</h1>
            <h1>Email</h1>
            <h1>Age</h1>
            <h1>Operations</h1>
          </div>
          <div className="users-div-userslists">
            {users.map(item => {
              return (
                <div className="card">
                  <img src={item.image} alt=" Uaer Image" />
                  <p>{item.name}</p>
                  <p>{item.email}</p>
                  <p>{item.age}</p>

                  <div className="card-buttons">
                    <Button
                      content="Download"
                      className="cardButton download"
                      onClick={() => onDownloadClick(item)}
                    />
                    <Button
                      content="Edit"
                      className="cardButton update"
                      onClick={() => onEditClick(item._id)}
                    />{' '}
                    <Button
                      content="Delete"
                      className="cardButton delete"
                      onClick={() => onDeleteClick(item._id)}
                    />
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </>
  );
};

export default Home;
