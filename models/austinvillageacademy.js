module.exports = function(sequelize, DataTypes){
  return austinvillageacademy = sequelize.define("austinvillageacademy", {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true
    },
    link: DataTypes.STRING,
    name: DataTypes.STRING,
    date: DataTypes.STRING,
    age: DataTypes.STRING,
    rate: DataTypes.STRING,
    description: DataTypes.TEXT('LONG'),
    others: DataTypes.STRING
  },
  {
    tableName: 'austinvillageacademy'
  });
};