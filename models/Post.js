"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
    class Post extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {}
        // define association here
    }
    Post.init(
        {
            prompt: {
                type: DataTypes.STRING(200),
                allowNull: false, //필수값
            },
            translatedPrompt: {
                type: DataTypes.STRING(200),
                allowNull: false, //필수값
            },
            isLike: {
                type: DataTypes.BOOLEAN,
                allowNull: false, //필수값
                defaultValue: false,
            },
            isApproved: {
                type: DataTypes.BOOLEAN,
                allowNull: false, //필수값
                defaultValue: false,
            },
            hit: {
                type: DataTypes.INTEGER(30),
                allowNull: true, //필수값,
                defaultValue: 0,
            },
            imageUrl: {
                type: DataTypes.STRING(100),
                allowNull: true,
            },
            userName: {
                type: DataTypes.STRING(30),
                allowNull: false,
            },
            userEmail: {
                type: DataTypes.STRING(30),
                allowNull: false,
            },
            userPhone: {
                type: DataTypes.STRING(30),
                allowNull: true,
            },
        },
        {
            sequelize,
            modelName: "Post",
            charset: "utf8",
            collate: "utf8_general_ci",
            underscored: true,
        }
    );

    Post.associate = function (models) {

    };


    return Post;
};