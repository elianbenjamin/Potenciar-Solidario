const { Answer, User } = require("../../db");
const { Comment } = require('../../db')

const GetAnswer = async (id) => {
  if (id) {
    const allAnswer = await Answer.findOne({
      where: { id: id },
      include: [
        {
          model: Comment,
          include: {
            model: User,
            attributes: ['name']
          }
        },
        {
          model: User,
          attributes: ['name']
        }
      ]
    });
    
    return allAnswer;
  }

  const answersAll = await Answer.findAll({
    include: [
      {
        model: Comment,
        include: {
          model: User,
          attributes: ['name']
        }
      },
      {
        model: User,
        attributes: ['name']
      }
    ]
  });
  
  return answersAll;
};

module.exports = {
  GetAnswer
};
