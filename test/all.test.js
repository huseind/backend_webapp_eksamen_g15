import supertest from 'supertest';
import { app } from '../server.js';
import User from '../model/user.js';
import Aritcle from '../model/article.js';


// deleting users so tests can be run again


// deleting users so tests can be run again
const resetDB = async () => User.collection.drop();
const resetArticleDB = async () => Aritcle.collection.drop();

const user = {
  name: 'user',
  email: 'user1@user.no',
  password: 'user1',
};

const admin = {
  name: 'admin',
  email: 'admin1@user.no',
  password: 'admin1',
  role: 'admin',
};

const superAdmin = {
  name: 'super',
  email: 'super1@user.no',
  password: 'super1',
  role: 'superAdmin'
};


let token = '';
let superToken = '';
let articleID = ';'

it('register a new user should give 200', async () => {
  try {
    await resetDB();
  } catch (error) {
    console.log('DB does not yet exist, skipping collection dropping')
  }
  
  const registerNew = await supertest(app).post('/user/register').send(user);

  expect(registerNew.status).toEqual(200);
});


it('login with created user ', async () => {
  const data = await supertest(app)
    .post('/user/login')
    .send({ email: user.email, password: user.password })
    .expect(200);
  token = data.body.token;
});

it('getUser fetching user data', async () => {
  const data = await supertest(app)
    .get('/user/me')
    .send()
    .set({ Cookie: `token=${token}` })
    .expect(200);
});

it('user should be able to logout', async () => {
  await supertest(app)
    .post('/user/logout')
    .expect(200, { success: true, data: 'You have been logged out' });
});


it('register admin should give 200', async () => {
  await resetDB();
  const registerNew = await supertest(app).post('/user/register').send(admin);

  expect(registerNew.status).toEqual(200);
});


it('register SuperAdmin should give 200', async () => {
  await resetDB();
  const registerNew = await supertest(app).post('/user/register').send(superAdmin);

  expect(registerNew.status).toEqual(200);
});

it('login with created super superAdmin should give 200 ', async () => {
  const data = await supertest(app)
    .post('/user/login')
    .send({ email: superAdmin.email, password: superAdmin.password })
    .expect(200);
  superToken = data.body.token;
});

it('superadmin should get 200 when getting logdata', async () => {
  const logdata = await supertest(app).get('/user/logdata').set({ Cookie: `token=${superToken}` });

   expect(logdata.status).toEqual(200);
});



///////////////////// ARTICLE TEST///////////////////////////////



const category = {
  name: 'comedy',
};


const article = {
  title: 'Article',
  ingress: 'Ingress',
  subtitleOne: 'Subtitle',
  contentOne: 'not so great',
  contentTwo: 'woho',
  category: '',
  author: 'Lars',
};


it('admin and super should be able to create a category', async () => {
  const sentCategory = await supertest(app)
    .post('/article/category')
    .set({ Cookie: `token=${superToken}` })
    .send(category);
  category.id = sentCategory.body.data._id;
  article.category = category.id;
});

it('should be possible to get all categoies', async () => {
  await supertest(app).get('/article/categories').expect(200);
})

it('admin and super should be able to create article', async () => {
  const created= await supertest(app).post('/article/create').set({ Cookie: `token=${superToken}` }).send(article);
  articleID = created.body.data._id;
  expect(created.status).toEqual(201);
} )

it('loged in users should be able to get all articles', async () => {
  const articles = await supertest(app).get('/article').expect(200);
  expect(articles.body.data).toBeInstanceOf(Array);
})

it('users should be able to get articles by id', async () => {
  const getArticle = await supertest(app).get(`/article/${articleID}`).expect(200);
  expect(getArticle.body.data).toBeInstanceOf(Object);
})

it('super admin and admin should be able to edit articles', async () => {
  const editArticle = await supertest(app).put(`/article/${articleID}`).set({Cookie : `token=${superToken}`}).send({title : 'Ny Tittel'}).expect(200);
  expect(editArticle.body.data.title).toEqual('Ny Tittel')
})

it('super admin and admin should be able to delete an article', async () => {
  const deleteArticle = await supertest(app).delete(`/article/${articleID}`).set({Cookie : `token=${superToken}`}).expect(204);
})


it('users that are not loged in should be able to se public articles', async () => {
  await supertest(app).post('/user/logout');
  const publicArticles = await supertest(app).get('/article').expect(200);
  expect(publicArticles.body.data).toBeInstanceOf(Array);
})



///////////////////////CONTACT FORM//////////////////////////////////////

const form = {
  name : "User",
  email: "user@dsa.no",
  subject: "Form",
  message: "Form message"
}

let formID = '';

it('anybody should be able to send a contact form', async () => {
  const formSent = await supertest(app).post('/contact').send(form).expect(201);
  formID = formSent.body.data._id;
})

it('admin and superAdmin should be able to see all forms', async () => {
  const logedInUser = await supertest(app)
  .post('/user/login')
  .send({ email: superAdmin.email, password: superAdmin.password });
  superToken = logedInUser.body.token;

  const allForms = await supertest(app).get('/contact').set({Cookie : `token=${superToken}`});
  expect(allForms.body.data).toBeInstanceOf(Array);
})

 it('admin and super admin should be able to delete contact forms', async () => {
   const delted = await supertest(app).delete(`/contact/delete/${formID}`).set({Cookie : `token=${superToken}`}).expect(204);
 })

