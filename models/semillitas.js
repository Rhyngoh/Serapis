module.exports = function(sequelize, DataTypes){
  return semillitas = sequelize.define("semillitas", {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true
    },
    title: DataTypes.STRING,
    program: DataTypes.STRING,
    duration: DataTypes.STRING,
    firstchildrate: DataTypes.STRING,
    secondchildrate: DataTypes.STRING,
    thirdchildrate: DataTypes.STRING,
    youngersiblingrate: DataTypes.STRING,
    sidenote1: DataTypes.STRING,
    sidenote2: DataTypes.STRING,
    sidenote3: DataTypes.TEXT('LONG'),
    materials: DataTypes.STRING,
    cancellation: DataTypes.TEXT('LONG'),
    location: DataTypes.STRING,
  },
  {
    tableName: 'semillitas'
  });
};