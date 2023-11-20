const {userPost} = require('../../controllers/User/PostUser')

const userPostHandlers = async (req, res) => {
  const {
    name,
    lastname,
    email,
    description,
    DNI,
    birth_date,
    phone,
    profile_picture,
    habitual_location_of_residence,
    geographical_area_residence,
    admin,
    password
  } = req.body;
  try {
    const newUser = await userPost({ 
      name,
      lastname,
      email,
      description,
      DNI,
      birth_date,
      phone,
      profile_picture,
      habitual_location_of_residence,
      geographical_area_residence,
      admin,
      password })
      if (!newUser) throw new Error('No se ha podido registrar el Usuario.')
      res.status(201).json(newUser)
  } catch (error) {
    res.status(403).json({ error: error.message });
  }
};

module.exports ={ userPostHandlers};
