const axios = require('axios');

const api = 'https://swapi.co/api/people';

function getPeoples(page) {
  return axios.get(`${api}/?page=${page}`);
}

function getPeople(id) {
  return axios.get(`${api}/${id}`);
}

export { getPeoples, getPeople };
