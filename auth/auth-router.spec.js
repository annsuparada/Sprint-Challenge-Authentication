const request = require('supertest');
const server = require('../api/server.js')

describe('Register', () => {
    describe('POST /register', () => {
      it('returns 201 OK when register success', () => {
        return request(server)
          .post('/api/auth/register')
          .send({username: 'Ann5', password: '123456'}) //chang username if get fail test
          .set('accept', 'application/json')
          .then(res => {
            expect(res.status).toBe(201);
          });
      });
      it('returns 500 when user is already have username',  () => {
        const user = {username: 'Ann2', password: '123456'}
        request(server)
          .post('/api/auth/register')
          .send(user)
          .set('accept', 'application/json')
          .then(res => {
            expect(res.status).toBe(500);
          });
      });
    });
  });

  describe('Login', () => {
      describe('POST /login', () => {
          it('login when user previde username and password correctly', () => {
            const user = {username: 'Ann2', password: '123456'}
                return request(server)
                    .post('/api/auth/login')
                    .send(user)
                    .set('accept', 'application/json')
                    .then(res => {
                        expect(res.status).toBe(200);
                    });
          })
          it('Will not login when user previde wrong username and password ', () => {
            const user = {username: 'Ann2', password: '123456'}
                return request(server)
                    .post('/api/auth/login')
                    .send({username: 'Ann2', password: 'wrong'})
                    .set('accept', 'application/json')
                    .then(res => {
                        expect(res.status).toBe(401);
                    });
          })

      })
  })
