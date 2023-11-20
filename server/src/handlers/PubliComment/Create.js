const {CreateController} = require('../../controllers/PubliComment/Create')

const CreateHandler = async (req , res) => {
    try {
        const {userId , publicationId , comment} = req.body;
        if(!comment) throw new Error ('Campo imcompleto')

        const createFn = await CreateController({userId , publicationId , comment})

        return res.status(200).json(createFn)
    } catch (error) {
        return res.status(500).json({error: error.message})
    }
}

module.exports = {CreateHandler}