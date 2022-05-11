import { DB, USER, PASSWORD, HOST, dialect as _dialect, pool as _pool } from "../config/db.config.js";
import Sequelize from "sequelize";
import db_user from '../models/user.js';
import db_role from '../models/role.js';
import db_post from '../models/post.js';
import db_comment from '../models/comment.js'

const sequelize = new Sequelize(
  DB,
  USER,
  PASSWORD,
  {
    host: HOST,
    dialect: _dialect,
    operatorsAliases: false,
    pool: {
      max: _pool.max,
      min: _pool.min,
      acquire: _pool.acquire,
      idle: _pool.idle
    }
  }
);

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.user = db_user(sequelize, Sequelize);
db.role = db_role(sequelize, Sequelize);
db.post = db_post(sequelize, Sequelize);
db.comment = db_comment(sequelize, Sequelize);

db.role.belongsToMany(db.user, {
  through: "user_roles",
  foreignKey: "roleId",
  otherKey: "userId"
});

db.user.belongsToMany(db.role, {
  through: "user_roles",
  foreignKey: "userId",
  otherKey: "roleId"
});

db.user.hasMany(db.post, {
  foreignKey: "userId"
});

db.post.belongsTo(db.user);

db.user.hasMany(db.comment, {
  foreignKey: "userId"
})

db.post.hasMany(db.comment, {
  foreignKey: "postId"
})

db.comment.belongsTo(db.user);

db.comment.belongsTo(db.post);

db.ROLES = ["user", "admin", "moderator"];

export default db;