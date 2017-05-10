module.exports = function(sequelize, DataTypes){
  return CampEagle = sequelize.define("campeagle", {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true
    },
    campname: DataTypes.STRING,
    session: DataTypes.STRING,
    date: DataTypes.STRING,
    rate: DataTypes.STRING,
    title: DataTypes.STRING,
    link: DataTypes.STRING
  });
};