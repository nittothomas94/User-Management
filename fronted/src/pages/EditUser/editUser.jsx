import './editUser.css';
import Navbar from '../../components/Navbar/navbar';
import Input from '../../components/Input/input';
import { use, useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import Button from '../../components/Button/button';
import axios from '../../utils/axios';

const EditUser = () => {
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

  const { id } = useParams();

  const getUserByID = async () => {
    const response = await axios.get('http://localhost:3000/api/users/' + id);
    setUser(response.data);
  };

  useEffect(() => {
    getUserByID();
  }, []);

  const onChange = (e, key) => {
    setUser({ ...user, [key]: e.target.value });
  };

  console.log(user);

  const onEditUserClick = async () => {
    const response = await axios.patch(
      'http://localhost:3000/api/users/' + id,
      user
    );
    navigate('/');
  };

  const nameOfTheUser = user.name.toUpperCase();

  return (
    <>
      <Navbar />

      <div className="editUser-container">
        <h1>EDIT USER{nameOfTheUser}</h1>
        <div className="edit-user">
          <Input
            className="input-edituser"
            label="Name"
            value={user.name}
            onChange={e => onChange(e, 'name')}
          />
          <Input
            className="input-edituser"
            label="Email"
            value={user.email}
            onChange={e => onChange(e, 'email')}
          />
          <Input
            className="input-edituser"
            label="Age"
            value={user.age}
            onChange={e => onChange(e, 'age')}
          />
          {/* <Input
            className="input-edituser"
            label="Image"
            type="file"
            onChange={e => onUploadImage(e, 'image')}
          /> */}
          <Input
            className="input-edituser"
            label="Role"
            value={user.role}
            onChange={e => onChange(e, 'role')}
          />
          <Input
            className="input-edituser"
            label="Contact Number"
            value={user.phoneNumber}
            onChange={e => onChange(e, 'contactNumber')}
          />
          <Input
            className="input-edituser"
            label="City"
            value={user.city}
            onChange={e => onChange(e, 'city')}
          />
          <Input
            className="input-edituser"
            label="State"
            value={user.state}
            onChange={e => onChange(e, 'state')}
          />
          <Input
            className="input-edituser"
            label="Nation"
            value={user.nation}
            onChange={e => onChange(e, 'nation')}
          />
        </div>
        <div className="edit-page-buttons">
          <Button
            content="Cancel"
            className="cancel"
            onClick={onEditUserClick}
          />
          <Button
            content="Update"
            className="update"
            onClick={onEditUserClick}
          />
        </div>
      </div>
    </>
  );
};

export default EditUser;
