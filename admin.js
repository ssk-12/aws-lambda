const express = require('express');
const performGraphQLRequest = require('./client');
const validateMiddleware = require('./validate');
const { check } = require('express-validator');
const router = express.Router();

router.use(express.json());

const rules = [
  check('name').isString().trim().notEmpty().withMessage("incorrect name"),
  check('email').isString().trim().notEmpty().isEmail(),
];

router.get('/getUsers', async (req, res) => {
  const query = `
    query {
      users {
        name
      }
    }
  `;

  try {
    const data = await performGraphQLRequest(query);
    console.log(data);
    return res.status(200).json(data);
  } catch (error) {
    console.error('Error fetching users:', error);
    return res.status(500).json({ error: 'Error fetching users' });
  }
});

router.get('/', (req, res) => {
  return res.status(200).json({
    message: 'Hello from root!',
  });
});

router.get('/hello', (req, res) => {
  return res.status(200).json({
    message: 'Hello from path!',
  });
});

router.get('/getUsers2', async (req, res) => {
  const query = `
    query {
      users {
        id
        name
        email
      }
    }
  `;

  try {
    const data = await performGraphQLRequest(query);
    console.log(data);
    return res.status(200).json(data);
  } catch (error) {
    console.error('Error fetching users:', error);
    return res.status(500).json({ error: 'Error fetching users' });
  }
});

router.post('/insertUser', async (req, res) => {
  const { email, name, password } = req.body;

  const mutation = `
    mutation($email: String!, $name: String!, $password: String!) {
      insert_users(objects: {email: $email, name: $name, password: $password}) {
        returning {
          id
        }
      }
    }
  `;

  const variables = { email, name, password };

  try {
    const data = await performGraphQLRequest(mutation, variables);
    console.log(data);
    return res.status(200).json(data);
  } catch (error) {
    console.error('Error inserting user:', error);
    return res.status(500).json({ error: 'Error inserting user' });
  }
});

router.patch('/updateUser', validateMiddleware(rules), async (req, res) => {
  const { email, name } = req.body;
  console.log(email, name);

  const mutation = `
    mutation($email: String!, $name: String!) {
      update_users(where: {email: {_eq: $email}}, _set: {name: $name}) {
        affected_rows
        returning {
          name
          id
          email
        }
      }
    }
  `;

  const variables = { email, name };

  try {
    const data = await performGraphQLRequest(mutation, variables);
    console.log(data);
    return res.status(200).json(data);
  } catch (error) {
    console.error('Error updating user:', error);
    return res.status(500).json({ error: 'Error updating user' });
  }
});

router.delete('/delete/:userId', async (req, res) => {
  const userId = req.params.userId;

  const mutation = `
    mutation DeleyteCopy {
      delete_attendances(where: {user_id: {_eq: "${userId}"}}) {
        affected_rows
      }
      delete_class_attendances(where: {user_id: {_eq: "${userId}"}}) {
        affected_rows
      }
      delete_class_enrollments(where: {user_id: {_eq: "${userId}"}}) {
        affected_rows
      }
      delete_users(where: {id: {_eq: "${userId}"}}) {
        affected_rows
      }
    }
  `;

  try {
    const data = await performGraphQLRequest(mutation);
    console.log(data);
    return res.status(200).json(data);
  } catch (error) {
    console.error('Error deleting user data:', error);
    return res.status(500).json({ error: 'Error deleting user data' });
  }
});

router.use((req, res) => {
  return res.status(404).json({
    error: 'Not Found',
  });
});

module.exports = router;
