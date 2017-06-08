module.exports = function(sequelize, DataTypes){
  return georgetownspanishacademy = sequelize.define("georgetownspanishacademy", {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true
    },
    camptitle: DataTypes.STRING,
    campname: DataTypes.STRING,
    agecondition: DataTypes.STRING,
    youngercondition: DataTypes.STRING,
    languagecondition: DataTypes.STRING,
    youngestcondition: DataTypes.STRING,
    camphours: DataTypes.STRING,
    campduration: DataTypes.STRING,
    campduration: DataTypes.STRING,
    spotslimited: DataTypes.STRING,
    price: DataTypes.STRING,
    dropoffprice: DataTypes.STRING,
    weektitle: DataTypes.STRING,
    weekdate: DataTypes.STRING,
    contactphone: DataTypes.STRING,
    contactemail: DataTypes.STRING
  },
  {
    tableName: 'georgetownspanishacademy'
  });
};