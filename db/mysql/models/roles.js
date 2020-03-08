module.exports = (sequelize, DataTypes) => {
  const Role = sequelize.define(
    "Role",
    {
      name: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notNull: {
            msg: "Name is missing",
          },
          notEmpty: {
            msg: "Name must not be empty",
          },
          isIn: {
            args: [["admin", "member"]],
            msg: "Name is not allowed",
          },
        },
      },
    },
    {
      tableName: "roles",
      underscored: true,
      name: {
        singular: "role",
        plural: "roles"
      },
      sequelize,
    }
  );

  Role.associate = (models) => {
    Role.hasMany(models.User);
  };
  return Role;
};
