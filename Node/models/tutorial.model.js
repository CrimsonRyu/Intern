module.exports = (sequelize, Sequelize) => {
    const Tutorial = sequelize.define("interns", {
      Name: {
        type: Sequelize.STRING
      },
      Age: {
        type: Sequelize.INTEGER
      },
      Phone: {
        type: Sequelize.BIGINT
      }
    }, {
        timestamps: false
    });
  
    return Tutorial;
  };