/* global describe beforeEach it */

const {expect} = require('chai')
const db = require('../index')
const Ticket = db.models.ticket;
const Movie = db.models.movie;

describe('Ticket Model', () => {
  let rocky, blockbuster, ghostbusters;
  beforeEach(async() => {
    await db.sync({force: true})
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
    ];
    await Promise.all(tickets);
    await rocky.reload();
    //blockbuster = Movie.blockbuster();
  })

  describe('#ticketCount', ()=> {
    it('increments the ticketCount of it\'s movie', ()=> {
      expect(rocky.ticketCount).to.equal(6);
    });
  });

  describe('Movie.blockbuster', ()=> {
    it('returns movie which sold the most tickets', ()=> {
    });
  });


}) // end describe('User model')
