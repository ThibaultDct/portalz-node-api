const config = require("../config/db.config.js");

const Sequelize = require("sequelize");
const sequelize = new Sequelize(
  config.DB,
  config.USER,
  config.PASSWORD,
  {
    host: config.HOST,
    dialect: config.dialect,
    operatorsAliases: false,

    pool: {
      max: config.pool.max,
      min: config.pool.min,
      acquire: config.pool.acquire,
      idle: config.pool.idle
    }
  }
);

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.user = require("../models/user.model.js")(sequelize, Sequelize);
db.role = require("../models/role.model.js")(sequelize, Sequelize);
db.profile = require("../models/profile.model")(sequelize, Sequelize);
db.language = require("../models/language.model")(sequelize, Sequelize);

// MANY USERS TO MANY ROLES
db.role.belongsToMany(db.user, {
  through: "user_roles",
  foreignKey: "role_id",
  otherKey: "user_id"
});
db.user.belongsToMany(db.role, {
  through: "user_roles",
  foreignKey: "user_id",
  otherKey: "role_id"
});

// ONE USER TO ONE PROFILE
 //db.user.hasOne(db.profile);
//  db.user.belongsTo(db.profile, { through: "profile" });
//  db.profile.hasOne(db.user)
db.profile.belongsTo(db.user)
db.user.hasOne(db.profile)

 // MANY PROFILES TO MANY LANGUAGES
 db.profile.belongsToMany(db.language, {
  through: "profile_languages",
  foreignKey: "language_id",
  otherKey: "profile_id"
});
 db.language.belongsToMany(db.profile, {
  through: "profile_languages",
  foreignKey: "profile_id",
  otherKey: "language_id"
});

db.ROLES = ["user", "admin", "moderator"];

module.exports = db;
