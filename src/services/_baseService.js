import axios from "./axios";

export const commonApiCalls = (endpoint, http) => {
  return {
    getAll: function () {
      return http.get(endpoint).then((res) => res.data);
    },
    create: function (body) {
      return http.post(endpoint, body).then((res) => res.data);
    },
    getById: function (id) {
      return http.get(`${endpoint}/${id}`).then((res) => res.data);
    },
    updateById: function (id = "", body) {
      return http.put(`${endpoint}/${id}`, body).then((res) => res.data);
    },
    deleteById: function (id) {
      return http.delete(`${endpoint}/${id}`).then((res) => res.data);
    },
  };
};

/**
 * @param {string} endpoint name of the endpoint example: 'users'
 * @param {httpClient} httpProvider client for http requests like axios
 * @returns
 */
const baseService = (endpoint = "", http = axios) => {
  return {
    endpoint,
    http,
    ...commonApiCalls(endpoint, http),
  };
};
export default baseService;
