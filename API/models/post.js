export default (sequelize, Sequelize) => {
    const Post = sequelize.define("posts", {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true
      },
      name: {
        type: Sequelize.STRING
      },
      description: {
        type: Sequelize.STRING
      },
      path: {
          type: Sequelize.STRING
      },
      likes: {
          type: Sequelize.INTEGER
      }
    });
    return Post;
};