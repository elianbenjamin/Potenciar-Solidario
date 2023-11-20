const { Publication , User } = require("../../db");
const {deleteNoti} = require('../../handlers/emailNotif/deleteNoti')
const {rejectPost} = require("../../handlers/emailNotif/rejectPost");

const DeletePubCont = async (id) => {

  const publication = await Publication.findOne({
    where: { id: id },
    include: {model: User} // Incluir el modelo de Usuario para acceder a sus datos
  });
  
    if (!publication) {
      return { deletedRows: 0, message: "Publication not found" };
    }
  
    await Publication.destroy({ where: { id: id } });


    const user = publication.User
   
    const userEmail = user.email


    if(publication.status){
      console.log("deleatepost")
      deleteNoti(publication.title , userEmail);
      return { deletedRows: 1, message: "Publication deleted" };
    }

    console.log("rejectpost")
    rejectPost(publication.title , userEmail);
    return { deletedRows: 1, message: "Publication deleted" };
    

    

    
};

module.exports = { DeletePubCont };
