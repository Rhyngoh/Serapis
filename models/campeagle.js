module.exports = function(sequelize, DataTypes){
  return campeagle = sequelize.define("campeagle", {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true
    },
    camptitle: DataTypes.STRING,
    agerange: DataTypes.STRING,
    campdesc: DataTypes.TEXT('LONG'),
    purpose: DataTypes.STRING,
    philosophy: DataTypes.TEXT('LONG'),
    expect: DataTypes.TEXT('LONG'),
    campname: DataTypes.STRING, 
    title: DataTypes.STRING,
    session: DataTypes.STRING,
    date: DataTypes.STRING,
    rate: DataTypes.STRING,
    link: DataTypes.STRING
  },
  {
    tableName: 'campeagle'
  });
};