module.exports = (sequelize, DataTypes) => {
  const Item = sequelize.define(
    "Item",
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
          not: {
            args: /[`~,<>;':"/[\]|{}()=_+-\d]/,
            msg: "Name must only contain letters",
          },
        },
      },
      model: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notNull: {
            msg: "Model is missing",
          },
          notEmpty: {
            msg: "Model must not be empty",
          },
          not: {
            args: /[`~,<>;':"/[\]|{}()=_+-\d]/,
            msg: "Model must only contain letters",
          },
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
      image: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notNull: {
            msg: "Image is missing",
          },
          notEmpty: {
            msg: "Image must not be empty",
          },
        },
      },
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
            args: [["NEW", "USED"]],
            msg: "Status not allowed",
          },
        },
      },
      total: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
          notNull: {
            msg: "Total amount is missing"
          },
          notEmpty: {
            msg: "Total amount must not be empty",
          },
          isInt: {
            msg: "Total amount must be integer",
          },
          min: 0,
          max: 1000,
        },
      },
      onLoan: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
          notNull: {
            msg: "On Loan amount is missing"
          },
          notEmpty: {
            msg: "On Loan amount must not be empty",
          },
          isInt: {
            msg: "On Loan amount must be integer",
          },
          min: 0,
          max: 1000,
        },
      },
    },
    {
      tableName: "items",
      underscored: true,
      name: {
        singular: "item",
        plural: "items",
      },
      sequelize,
    }
  );

  Item.associate = (models) => {
    Item.belongsTo(models.User, {
      as: "RegisteredBy",
      foreignKey: "registered_by",
    });
  };

  return Item;
};
