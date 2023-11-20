const {PutController} = require('../../controllers/PubliComment/Put')

const PutHandler = async (req, res) => {   
    try {

      const { id } = req.params;
      const { comment } = req.body;

      if(!id || !comment) throw new Error ("falta informacion")

      else{
        const updateComment = await PutController(id, comment);
    
        if (!updateComment) throw new Error ('No se pudo actualizar el comentario'); 

        return res.status(200).json(updateComment);

    }
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
};


  module.exports = { PutHandler };