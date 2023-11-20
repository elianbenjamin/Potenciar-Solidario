const { User } = require('../../db')

const userPost = async (userData) => {
  try {
    const newUser = await User.create(userData)

    return newUser;

    
  } catch (error) {
    throw new Error('Error al crear el usuario' + error)
  }
};

module.exports = {userPost};
