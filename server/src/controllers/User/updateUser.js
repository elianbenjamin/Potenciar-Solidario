const { User } = require("../../db");
const {userBanNoti} = require("../../handlers/emailNotif/UserBan");
const {reactivationAccount} = require("../../handlers/emailNotif/reactivationAccount")


const updateUser = async (id, userData) => {
  try {
    const user = await User.findByPk(id);

    if (!user) throw new Error("Usuario no encontrado");

    user.name = userData.name;
    user.lastname = userData.lastname;
    user.email = userData.email;
    user.description = userData.description;
    user.DNI = userData.DNI;
    user.birth_date = userData.birth_date;
    user.phone = userData.phone;
    user.profile_picture = userData.profile_picture;
    user.habitual_location_of_residence =
      userData.habitual_location_of_residence;
    user.geographical_area_residence = userData.geographical_area_residence;
    user.admin = userData.admin;
    user.password = userData.password;
    user.organization = userData.organization;

    const userActivePrevious = user.active

    user.active = userData.active; 

    await user.save();

    if(userActivePrevious !== user.active){

      if(user.active === false){

        userBanNoti(user.email)

      }else {
        reactivationAccount(user.email)
      }
      
    }

    return user;

  } catch (error) {
    throw new Error("Error actualizar el usuario", error);
  }
};

module.exports = {
    updateUser,
}
