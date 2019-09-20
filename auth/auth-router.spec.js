const request = require('supertest');
const Users = require('./auth-router.js')

describe('router', () => {
    describe('POST /', () => {
      it('returns 201 OK', () => {
        return request(Users)
          .get('/register')
          .then(res => {
            expect(res.status).toBe(201);
          });
      });
    //   it('returns JSON', done => {
    //     request(Users)
    //       .get('/register')
    //       .then(res => {
    //         expect(res.type).toMatch(/json/i);
    //         done();
    //       });
  
    //     });
    });
  });