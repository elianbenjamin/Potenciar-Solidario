const { Question, Answer , User, Comment} = require("../../db.js");

const ControllerGetQuestion = async (id) => {
  if (id) {
    const questionById = await Question.findOne({
      where: { id: id },
      include: [
        {
          model: Answer, include: [{ model: User, attributes: ['name', 'profile_picture', 'id'] }, {
          model: Comment, include: { model: User, attributes: ['name', 'profile_picture', 'id'] }
          
        }]},
        {model: User, attributes: ['name',  'profile_picture', 'id']}, 
      ]
      
    });

    return questionById;
  }

  const questionAll = await Question.findAll({
    include: [
      { model: Answer , include: {model: User , attributes: ['name', 'profile_picture']}},
      {model: User, attributes: ['name', 'profile_picture']}
    ]
  });

  return questionAll;
};

module.exports = { ControllerGetQuestion };
