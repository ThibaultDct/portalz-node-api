module.exports = (sequelize, Sequelize) => {
    const Role = sequelize.define("roles", {
      role_id: {
        type: Sequelize.UUID,
        primaryKey: true
      },
      name: {
        type: Sequelize.STRING
      }
    });
  
    return Role;
  };