const serverless = require("serverless-http");
const express = require("express");
const router = require("./admin")

const app = express();
app.use(express.json());


app.use("/admin",router)

//   const query = `
//     query {
//       users {
//         name
//       }
//     }
//   `;

//   try {
//     const data = await performGraphQLRequest(query);
//     console.log(data);
//     return res.status(200).json(data);
//   } catch (error) {
//     console.error('Error fetching users:', error);
//     return res.status(500).json({ error: 'Error fetching users' });
//   }
// });

// app.get("/", (req, res) => {
//   return res.status(200).json({
//     message: "Hello from root!",
//   });
// });

// app.get("/hello", (req, res) => {
//   return res.status(200).json({
//     message: "Hello from path!",
//   });
// });

// app.get('/getUsers2', async (req, res) => {
//   const query = `
//     query {
//       users {
//         id
//         name
//         email
//       }
//     }
//   `;

//   try {
//     const data = await performGraphQLRequest(query);
//     console.log(data);
//     return res.status(200).json(data);
//   } catch (error) {
//     console.error('Error fetching users:', error);
//     return res.status(500).json({ error: 'Error fetching users' });
//   }
// });

// app.post('/insertUser', async (req, res) => {
//   const { email, name, password } = req.body;

//   const mutation = `
//     mutation($email: String!, $name: String!, $password: String!) {
//       insert_users(objects: {email: $email, name: $name, password: $password}) {
//         returning {
//           id
//         }
//       }
//     }
//   `;

//   const variables = { email, name, password };

//   try {
//     const data = await performGraphQLRequest(mutation, variables);
//     console.log(data);
//     return res.status(200).json(data);
//   } catch (error) {
//     console.error('Error inserting user:', error);
//     return res.status(500).json({ error: 'Error inserting user' });
//   }
// });

// app.post('/updateUser', async (req, res) => {
//   const { email, name } = req.body;
//   console.log(email, name);

//   const mutation = `
//     mutation($email: String!, $name: String!) {
//       update_users(where: {email: {_eq: $email}}, _set: {name: $name}) {
//         affected_rows
//         returning {
//           name
//           id
//           email
//         }
//       }
//     }
//   `;

//   const variables = { email, name };

//   try {
//     const data = await performGraphQLRequest(mutation, variables);
//     console.log(data);
//     return res.status(200).json(data);
//   } catch (error) {
//     console.error('Error updating user:', error);
//     return res.status(500).json({ error: 'Error updating user' });
//   }
// });

app.use((req, res) => {
  return res.status(404).json({
    error: "Not Found",
  });
});

exports.handler = serverless(app);
