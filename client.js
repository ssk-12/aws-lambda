const axios = require('axios');
require('dotenv').config();

const HASURA_ENDPOINT = process.env.HASURA_ENDPOINT;
const HASURA_ADMIN_SECRET = process.env.HASURA_ADMIN_SECRET;

const performGraphQLRequest = async (query, variables) => {
  try {
    const response = await axios.post(
      HASURA_ENDPOINT,
      {
        query,
        variables
      },
      {
        headers: {
          'Content-Type': 'application/json',
          'x-hasura-admin-secret': HASURA_ADMIN_SECRET
        }
      }
    );

    return response.data;
  } catch (error) {
    console.error('Error performing GraphQL request:', error);
    throw new Error('Error performing GraphQL request');
  }
};

module.exports = performGraphQLRequest;
