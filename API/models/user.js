export default (sequelize, Sequelize) => {
    const User = sequelize.define("users", {
      username: {
        type: Sequelize.STRING
      },
      email: {
        type: Sequelize.STRING
      },
      password: {
        type: Sequelize.STRING
      }, 
      profile_picture: {
        type: Sequelize.STRING,
        defaultValue: "default.png"  
      }
    });
    return User;
};