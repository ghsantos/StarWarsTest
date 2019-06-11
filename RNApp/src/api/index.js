const axios = require('axios');

const api = 'https://swapi.co/api';

function getPeoples(page) {
  return axios.get(`${api}/people/?page=${page}`);
}

function getPeople(id) {
  return axios.get(`${api}/people/${id}`);
}

function getPlanet(id) {
  return axios.get(`${api}/planets/${id}`);
}

export { getPeoples, getPeople, getPlanet };
