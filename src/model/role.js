export default (sequelize, DataType) => {
  const Roles = sequelize.define("role", {
    id: {
      type: DataType.INTEGER,
      autoIncrement: true,
      primaryKey: true
    },
    name: {
      type: DataType.STRING,
      allowNull: false
    }
  });

  Roles.associate = models => {
    Roles.hasOne(models.user, { foreignKey: { allowNull: false, name: "role" } });
  };
  return Roles;
};
