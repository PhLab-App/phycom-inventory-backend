const { LOAN_STATUSES } = require("../../../constants");

module.exports = (sequelize, DataTypes) => {
  const Loan = sequelize.define(
    "Loan",
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
      startDate: {
        type: DataTypes.DATE,
        isDate: true,
        allowNull: false,
        validate: {
          notNull: {
            msg: "Start date is missing"
          },
        },
      },
      endDate: {
        type: DataTypes.DATE,
        isDate: true,
        allowNull: false,
        validate: {
          notNull: {
            msg: "End date is missing"
          },
          isAfterStart(value) {
            if (Date.parse(value) < Date.parse(this.startDate)) {
              throw new Error("End date must be after start date");
            }
          }
        },
      },
      devolutionDate: {
        type: DataTypes.DATE,
        isDate: true,
        allowNull: true,
        validate: {
          isAfterStart(value) {
            if (Date.parse(value) < Date.parse(this.startDate)) {
              throw new Error("Devolution date must be after start date");
            }
          }
        },
      },
      description: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notNull: {
            msg: "Description is missing",
          },
          notEmpty: {
            msg: "Description must not be empty",
          },
        },
      },
    },
    {
      tableName: "loans",
      underscored: true,
      name: {
        singular: "loan",
        plural: "loans",
      },
      sequelize,
    }
  );

  Loan.associate = (models) => {
    Loan.belongsTo(models.User, {
      as: "User",
      foreignKey: "user_id",
    });
  };

  return Loan;
};
