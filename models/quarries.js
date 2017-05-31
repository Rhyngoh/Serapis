module.exports = function(sequelize, DataTypes){
  return Quarries = sequelize.define("quarries", {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true
    },
    campname: DataTypes.STRING,
    campdescription: {
      type: DataTypes.TEXT('LONG'),
    },
    campoptions: DataTypes.STRING,
    registrationstart: DataTypes.STRING,
    registrationend: DataTypes.STRING,
    campstart: DataTypes.STRING,
    campend: DataTypes.STRING,
    price: DataTypes.STRING,
    link: DataTypes.STRING
  },
  {
    tableName: 'quarries'
  });
};