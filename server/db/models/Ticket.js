const Sequelize = require('sequelize')
const { UUID, UUIDV4, Transaction } = Sequelize;
const db = require('../db')
const redis = require('../redis');

const Ticket = db.define('ticket', {
  id: {
    type: UUID,
    defaultValue: UUIDV4,
    primaryKey: true
  }, 
  movieId: {
    type: Sequelize.UUID,
    allowNull: false
  }
})

Ticket.afterCreate(async function(ticket){
  const movie = await db.models.movie.findByPk(ticket.movieId);
  await movie.update({ ticketCount: movie.ticketCount + 1 });
  /*
  await db.transaction({isolationLevel: Transaction.ISOLATION_LEVELS.SERIALIZABLE}, async (t)=> {
    try {
    const movie = await db.models.movie.findByPk(ticket.movieId, { transaction: t});
    await movie.update({ ticketCount: movie.ticketCount + 1 }, { transaction: t});
    }
    catch(ex){
      console.log(ex.message);
    }
  });
  */
});

module.exports = Ticket
