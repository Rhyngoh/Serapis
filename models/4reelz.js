module.exports = function(sequelize, DataTypes){
  return reelzschooloffilm = sequelize.define("reelzschooloffilm", {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true
    },
    title: DataTypes.STRING,
    price: DataTypes.STRING,
    ages: DataTypes.STRING,
    groupsize: DataTypes.STRING,
    camptitle: DataTypes.STRING,
    campsummary: {
      type: DataTypes.TEXT('LONG'),
    },
    location: DataTypes.STRING,
    address: DataTypes.STRING,
    times: DataTypes.TEXT('LONG'),
    extendedcare: DataTypes.STRING
  },
  {
    tableName: 'reelzschooloffilm'
  });
};