const Sequelize = require('sequelize')
const { UUID, UUIDV4 } = Sequelize;
const db = require('../db')
const redis = require('../redis');

const Movie = db.define('movie', {
  id: {
    type: UUID,
    defaultValue: UUIDV4,
    primaryKey: true
  }, 
  title: {
    type: Sequelize.STRING,
    allowNull: false,
    unique: true
  },
  ticketCount: {
    type: Sequelize.INTEGER,
    defaultValue: 0
  }
})


module.exports = Movie
