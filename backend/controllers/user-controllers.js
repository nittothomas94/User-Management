const User = require('../db/models/user-schema');

// Get All Users
module.exports.getusers = async (req, res) => {
  try {
    const users = await User.find(req.query);
    // console.log(users);
    return res.status(200).json(users);
  } catch (e) {
    return res.status(500).json({ message: e.message });
  }
};

// Get User By Id
module.exports.getUserById = async (req, res) => {
  try {
    const { id } = req.params;

    const user = await User.findById(id);

    return res.status(200).json(user);
  } catch (e) {
    return res.status(500).json({ message: e.message });
  }
};

// Add/Post New User
module.exports.addUser = async (req, res) => {
  try {
    const { name, email, age, image, role, city, state, nation } = req.body;

    await User.create({
      name,
      email,
      age,
      image,
      role,
      city,
      state,
      nation,
    });

    return res.status(200).json({ message: 'user aded succesfully' });
  } catch (e) {
    return res.status(500).json({ message: e.message });
  }
};

//Update User By ID
module.exports.editUser = async (req, res) => {
  try {
    const { id } = req.params;

    const { body } = req;

    const resposne = await User.findByIdAndUpdate(id, body);

    return res.status(200).json({ message: 'Updated' });
  } catch (e) {
    return res.status(500).json({ message: e.message });
  }
};

//Delete User By Id
module.exports.deleteUser = async (req, res) => {
  try {
    const { id } = req.params;

    const resposne = await User.findByIdAndDelete(id);

    return res.status(200).json({ message: 'User Deleted Sucessfully' });
  } catch (e) {
    return res.status(500).json({ message: e.message });
  }
};
