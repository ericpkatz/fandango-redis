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
  ticketCountKey: {
    type: Sequelize.VIRTUAL,
    get: function(){
      return `ticketCount-${this.title}`;
    }
  }
  /*
  ticketCount: {
    type: Sequelize.INTEGER,
    defaultValue: 0
  }
  */
})

Movie.blockbuster = async function(){
  const values = await redis.zrevrange('ticketCounts', 0, 0);
  return this.findByPk(values[0]);
}
Movie.prototype.ticketCount = async function(){
  return (await redis.get(this.ticketCountKey))*1;
}


module.exports = Movie
