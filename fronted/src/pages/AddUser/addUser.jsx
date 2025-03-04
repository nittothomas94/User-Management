import './addUser.css';
import Navbar from '../../components/Navbar/navbar';
import Input from '../../components/Input/input';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Button from '../../components/Button/button';
import axios from '../../utils/axios';

const AddUser = () => {
  const [user, setUser] = useState({
    name: '',
    email: '',
    age: 0,
    image: '',
    role: '',
    phoneNumber: '',
    city: '',
    state: '',
    nation: '',
  });

  const navigate = useNavigate();

  const onChange = (e, key) => {
    setUser({ ...user, [key]: e.target.value });
  };

  
  const onUploadImage = async (e) => {
    const imageData = e.target.files[0];
    const formData = new FormData();
    formData.append("avatar", imageData);
  
    try {
      const response = await axios.post(
        "https://user-management-backend-2vr7.onrender.com/api/upload-img", // Ensure the correct API endpoint
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
  
      if (response.data.cloudinaryUrl) {
        setUser((prevUser) => ({ ...prevUser, image: response.data.cloudinaryUrl }));
      } else {
        throw new Error("Image upload response is missing the URL.");
      }
    } catch (err) {
      console.error("Image upload failed:", err);
      alert("Image upload failed! Please try again.");
    }
  };
  
  console.log(user);

  const onAddUserClick = async () => {
    const response = await axios.post('https://user-management-backend-2vr7.onrender.com/api/users', user,{ timeout: 10000 });
    navigate('/');
  };

  const onCancelClick = async () => {
    navigate('/');
  };

  return (
    <>
      <Navbar />

      <div className="addUser-container">
        <h1>ADD NEW USER</h1>
        <div className="add-user">
          <Input
            className="input-adduser"
            label="Name"
            onChange={e => onChange(e, 'name')}
          />
          <Input
            className="input-adduser"
            label="Email"
            onChange={e => onChange(e, 'email')}
          />
          <Input
            className="input-adduser"
            label="Age"
            onChange={e => onChange(e, 'age')}
          />
          <Input
            className="input-adduser"
            label="Image"
            type="file"
            onChange={e => onUploadImage(e, 'image')}
          />
          <Input
            className="input-adduser"
            label="Role"
            onChange={e => onChange(e, 'role')}
          />
          <Input
            className="input-adduser"
            label="Phone Number"
            onChange={e => onChange(e, 'phoneNumber')}
          />
          <Input
            className="input-adduser"
            label="City"
            onChange={e => onChange(e, 'city')}
          />
          <Input
            className="input-adduser"
            label="State"
            onChange={e => onChange(e, 'state')}
          />
          <Input
            className="input-adduser"
            label="Nation"
            onChange={e => onChange(e, 'nation')}
          />
        </div>
        <div className="addUserButtons">
          <Button
            content="Cancel"
            className="cancel-adduser cancel-btn"
            onClick={onCancelClick}
          />
          <Button
            content="Add User"
            className="cancel-adduser adduser-btn"
            onClick={onAddUserClick}
          />
        </div>
      </div>
    </>
  );
};

export default AddUser;
