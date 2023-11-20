const { Publication } = require("../../db");
const {postNoti} = require("../../handlers/emailNotif/postNoti");
const {pendingApprove} = require("../../handlers/emailNotif/pendingApprove")
const { User } = require("../../db");

const PutPublication = async (id, postData) => {
  try {
    if (id) {
      const findPublication = await Publication.findByPk(id);
      const user = await User.findOne({where: {id: findPublication.userID}})

      if (!findPublication) throw new Error("Post no encontrado");

      const prevPubStatus = findPublication.status;

      findPublication.title = postData.title;
      findPublication.description = postData.description;
      findPublication.category = postData.category;
      findPublication.startDate = postData.startDate;
      findPublication.endDate = postData.endDate;
      findPublication.modificationDate = postData.modificationDate;
      findPublication.creationDate = postData.creationDate;
      findPublication.organization = postData.organization;
      findPublication.url = postData.url;
      findPublication.image = postData.image;
      findPublication.registrationLink = postData.registrationLink;
      findPublication.contact = postData.contact;
      findPublication.status = postData.status;

      await findPublication.save();

      if(prevPubStatus !== postData.status){

        await findPublication.update({status: postData.status});

        if(postData.status === false){
          pendingApprove(findPublication.title , user.email)
        }
        else{
          
          postNoti(findPublication.title , user.email);
        }
      }

      return findPublication;
    }
  } catch (error) {
    throw new Error("Error actualizar el post", error);
  }
};
module.exports = { PutPublication };
