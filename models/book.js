"use strict";

const Sequelize = require('sequelize');

//Schema for books in database
module.exports = (sequelize) => {
    class Book extends Sequelize.Model {}
    Book.init({
        id: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },

        title: {
            type: Sequelize.STRING,
            allowNull: false,
            validate: {
                notNull: {
                    msg: "Please provide a value for 'title'."
                }, 
                notEmpty: {
                    msg: "Please provide a valid value for 'title'."
                }
            }
        },

        author: {
            type: Sequelize.STRING,
            allowNull: false,
            validate: {
                notNull: {
                    msg: "Please provide a value for 'author'."
                }, 
                notEmpty: {
                    msg: "Please provide a valid value for 'author'."
                }
            }
        },

        genre: {
            type: Sequelize.STRING,
        },

        year: {
            type: Sequelize.INTEGER,
        },

    }, {sequelize});

    return Book;
};