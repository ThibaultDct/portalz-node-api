const { v4: uuid } = require('uuid')

module.exports = (sequelize, Sequelize) => {
    const Language = sequelize.define("languages", {
        language_id: {
            type: Sequelize.UUID,
            primaryKey: true,
            defaultValue: Sequelize.UUIDV4
        },
        name: {
            type: Sequelize.STRING,
            allowNull: false,
        },
    });
  
    return Language;
  };