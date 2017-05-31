module.exports = function(sequelize, DataTypes){
  return rudemechs = sequelize.define("rudemechs", {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true
    },
    title: DataTypes.STRING,
    about: {
      type: DataTypes.TEXT('LONG'),
    },
    duration: DataTypes.STRING,
    performance: DataTypes.STRING,
    location: DataTypes.STRING,
    who: DataTypes.TEXT('LONG'),
    cost: DataTypes.STRING,
    link: DataTypes.STRING
  },
  {
    tableName: 'rudemechs'
  });
};