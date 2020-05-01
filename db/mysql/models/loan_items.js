module.exports = (sequelize, DataTypes) => {
  const LoanItem = sequelize.define(
    "LoanItem",
    {
      status: {
        type: DataTypes.STRING,
        allowNull: true,
        validate: {
          notEmpty: {
            msg: "Status must not be empty",
          },
        },
      },
      quantity: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
          notNull: {
            msg: "Quantity amount is missing"
          },
          notEmpty: {
            msg: "Quantity amount must not be empty",
          },
          isInt: {
            msg: "Quantity amount must be integer",
          },
          min: 0,
          max: 1000,
        },
      },
    },
    {
      tableName: "loan_items",
      underscored: true,
      name: {
        singular: "loan_item",
        plural: "loan_items",
      },
      sequelize,
    }
  );

  LoanItem.associate = (models) => {
    LoanItem.belongsTo(models.Loan, {
      as: "Loan",
      foreignKey: "loan_id",
    });
    LoanItem.belongsTo(models.Item, {
      as: "Item",
      foreignKey: "item_id",
    });
  };

  return LoanItem;
};
