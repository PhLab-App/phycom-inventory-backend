const { LOAN_STATUSES } = require("../../../constants");

module.exports = (sequelize, DataTypes) => {
  const LoanStatusUpdate = sequelize.define(
    "LoanStatusUpdate",
    {
      status: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notNull: {
            msg: "Status is missing"
          },
          notEmpty: {
            msg: "Status must not be empty",
          },
          isIn: {
            args: [LOAN_STATUSES],
            msg: "Status not allowed",
          },
        },
      },
    },
    {
      tableName: "loan_status_updates",
      underscored: true,
      name: {
        singular: "loan_status_update",
        plural: "loan_status_updates",
      },
      sequelize,
    }
  );

  LoanStatusUpdate.associate = (models) => {
    LoanStatusUpdate.belongsTo(models.Loan, {
      as: "Loan",
      foreignKey: "loan_id",
    });
    LoanStatusUpdate.belongsTo(models.User, {
      as: "User",
      foreignKey: "registered_by",
    });
  };

  return LoanStatusUpdate;
};
