"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
    class GpuServer extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {}
        // define association here
    }
    GpuServer.init(
        {
            server: {
                type: DataTypes.STRING(10),
                allowNull: false, //필수값
            },
            count: {
                type: DataTypes.INTEGER(30),
                allowNull: true, //필수값,
                defaultValue: 0,
            },

        },
        {
            sequelize,
            modelName: "GpuServer",
            charset: "utf8",
            collate: "utf8_general_ci",
            underscored: true,
        }
    );

    GpuServer.associate = function (models) {

    };


    return GpuServer;
};
