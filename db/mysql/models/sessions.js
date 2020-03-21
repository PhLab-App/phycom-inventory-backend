module.exports = (sequelize, DataTypes) => {
  const Session = sequelize.define(
    "Session",
    {
      ip: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notNull: {
            msg: "IP is missing",
          },
          notEmpty: {
            msg: "IP must not be empty",
          },
        },
      },
    },
    {
      tableName: "sessions",
      underscored: true,
      name: {
        singular: "session",
        plural: "sessions",
      },
      sequelize,
    }
  );

  Session.associate = (models) => {
    Session.belongsTo(models.User, { constraints: false });
  };

  return Session;
};
