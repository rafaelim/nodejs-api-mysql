import bcrypt from "bcrypt";

export default (sequelize, DataType) => {
  const Users = sequelize.define(
    "user",
    {
      id: {
        type: DataType.INTEGER,
        autoIncrement: true,
        primaryKey: true
      },
      name: {
        type: DataType.STRING,
        allowNull: false,
        validate: {
          notEmpty: {
            args: true,
            msg: "Name cannot be empty"
          }
        }
      },
      email: {
        type: DataType.STRING,
        allowNull: false,
        unique: {
          args: true,
          msg:
            "Oops. Looks like you already have an account with this email address. Please try to login.",
          fields: [sequelize.fn("lower", sequelize.col("email"))]
        },
        validate: {
          isEmail: {
            args: true,
            msg: "The email you entered is invalid or is already in our system."
          },
          max: {
            args: 254,
            msg:
              "The email you entered is invalid or longer than 254 characters."
          },
          notEmpty: true
        }
      },
      password: {
        type: DataType.STRING,
        allowNull: false,
        validate: {
          notEmpty: true
        }
      }
    },
    {
      hooks: {
        beforeCreate: user => {
          const salt = bcrypt.genSaltSync();
          user.set("password", bcrypt.hashSync(user.password, salt));
        }
      },
      classMethods: {
        isPassword: (encodedPassword, password) =>
          bcrypt.compareSync(password, encodedPassword)
      },
      indexes: [
        {
          unique: true,
          fields: ["email"]
        }
      ]
    }
  );
  return Users;
};
