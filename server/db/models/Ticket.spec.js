/* global describe beforeEach it */

const {expect} = require('chai')
const db = require('../index')
const redis = require('../redis')
const Ticket = db.models.ticket;
const Movie = db.models.movie;

describe('Ticket Model', () => {
  let rocky, blockbuster, ghostbusters, ticketCount;
  beforeEach(async() => {
    await db.sync({force: true})
    await redis.flushdb();
    const movies = await Promise.all([
      Movie.create({ title: 'Ghostbusters' }),
      Movie.create({ title: 'Rocky' })
    ]);
    ghostbusters = movies[0];
    rocky = movies[1];
    const tickets = [
      Ticket.create({ movieId: rocky.id }),
      Ticket.create({ movieId: rocky.id }),
      Ticket.create({ movieId: rocky.id }),
      Ticket.create({ movieId: rocky.id }),
      Ticket.create({ movieId: rocky.id }),
      Ticket.create({ movieId: rocky.id }),
      Ticket.create({ movieId: ghostbusters.id }),
      Ticket.create({ movieId: ghostbusters.id }),
      Ticket.create({ movieId: ghostbusters.id }),
      Ticket.create({ movieId: ghostbusters.id }),
      //Ticket.create({ movieId: ghostbusters.id }),
    ];
    await Promise.all(tickets);
    await rocky.reload();
    ticketCount = await rocky.ticketCount();
    blockbuster = await Movie.blockbuster();
  })

  describe('#ticketCount', ()=> {
    it('increments the ticketCount of it\'s movie', ()=> {
      expect(ticketCount).to.equal(6);
    });
  });

  describe('Movie.blockbuster', ()=> {
    it('returns movie which sold the most tickets', ()=> {
      expect(blockbuster.title).to.equal('Rocky');
    });
  });


}) // end describe('User model')
