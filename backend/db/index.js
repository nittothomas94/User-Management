const mongoose = require('mongoose');

mongoose
  .connect('mongodb+srv://nittothomas94:Nitto123@cluster0.guv3w.mongodb.net/user-managementDB?retryWrites=true&w=majority&appName=Cluster0')
  .then(() => {
    console.log('DB Connected');
  })
  .catch(e => {
    console.log(e);
  });

module.exports = mongoose;
