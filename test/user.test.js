import supertest from 'supertest';
import { app } from '../server.js';
import User from '../model/user.js';

// deleting users so tests can be run again
const resetDB = async () => User.collection.drop();

const user = {
  name: 'user',
  email: 'user1@user.no',
  password: 'user1',
};

let token = '';

it('register a user', async () => {
  await resetDB();
  const registerNew = await supertest(app)
    .post('/user/register')
    .send(user)
    .expect(200);
});

it('register same ', async () => {
  await supertest(app).post('/user/register').send(user).expect(400);
});

it('login with created user ', async () => {
  const data = await supertest(app)
    .post('/user/login')
    .send({ email: user.email, password: user.password })
    .expect(200);
  token = data.body.token;
  console.log(data.body);
});

it('getUser fetching user data', async () => {
  const data = await supertest(app)
    .get('/user/me')
    .send()
    .set({ Cookie: `token=${token}` })
    .expect(200);
});

// it('logging user out', async () => {
//   const logout = await supertest(app).
// })

// it('My Test Case', () => {
//   expect(true).toEqual(true);
// });

// it('async test', async () => {
//   // await et eller annet
//   expect('et eller annet').toEqual('et eller annet');
// });

// expect(A).toHaveLength(1);

// 404 FEIL ADRESSE BRO!!!
