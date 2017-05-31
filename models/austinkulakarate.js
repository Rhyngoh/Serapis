module.exports = function(sequelize, DataTypes){
  return AustinKulaKarate = sequelize.define("austinkulakarate", {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true
    },
    image: DataTypes.STRING,
    sessiontitle: DataTypes.STRING,
    instructorname: DataTypes.STRING,
    instructorlink: DataTypes.STRING,
    nextsession: DataTypes.STRING,
    enrollstartdate: DataTypes.STRING,
    enrollenddate: DataTypes.STRING,
    campdescripton: {
      type: DataTypes.TEXT('LONG')
    },
    extrainfo: {
      type: DataTypes.TEXT('LONG')
    }},
    {
      tableName: 'austinkulakarate'
    });
};