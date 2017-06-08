module.exports = function(sequelize, DataTypes){
  return laketravis = sequelize.define("laketravis", {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true
    },
    title: DataTypes.STRING,
    age: DataTypes.STRING,
    start: DataTypes.STRING,
    end: DataTypes.STRING,
    cost: DataTypes.STRING,
    instructor: DataTypes.STRING,
    description: DataTypes.STRING,
    schedule1: DataTypes.STRING,
    schedule2: DataTypes.STRING,
    schedule3: DataTypes.STRING,
    schedule4: DataTypes.STRING,
    moreinfo: DataTypes.STRING,
    contact: DataTypes.STRING,
    registerlink: DataTypes.STRING,
  },
  {
    tableName: 'laketravis'
  });
};