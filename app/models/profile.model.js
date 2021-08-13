const { v4: uuid } = require('uuid');

module.exports = (sequelize, Sequelize) => {
    const Profile = sequelize.define("profiles", {
        profile_id: {
            type: Sequelize.UUID,
            primaryKey: true,
            defaultValue: Sequelize.UUIDV4
        },
        bio: {
            type: Sequelize.STRING,
            allowNull: true,
        },
        avatar: {
            type: Sequelize.STRING,
            allowNull: true,
        },
    });

    Profile.beforeCreate( profile => profile_id = uuid() );
  
    return Profile;
  };