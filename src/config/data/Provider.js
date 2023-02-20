import axios from "axios";
import Cookies from 'universal-cookie';

const cookies = new Cookies();

const Provider = {
  _token: cookies.get("hinpl_access_token"),
  _axios: null,
  getHeaders: function () {
    return this._axios.defaults.headers;
  },
  init: function () {
    this._axios = axios.create({
      baseURL: "http://localhost:8000s/",
    });
    this.request();
    this.response();
  },
  request: function () {
    this._axios.interceptors.request.use(
      (config) => {
        if (this._token) {
          config.headers = {
            Accept: config.headers.Accept ?? "application/json",
            Authorization: `Bearer ${this._token}`,
          };
        }
        return config;
      },
      (error) => {
        Promise.reject(error);
      }
    );
  },
  response: function () {
    this._axios.interceptors.response.use(
      (response) => {
        if (response.status > 204) {
          return Promise.reject("error");
        } else {
          return response;
        }
      },
      (error) => {
        if (error.response.status === 401) {
          cookies.remove("hinpl_access_token");
          this.removeToken();
          window.location.href = "/login";
        }
        return Promise.reject(error);
      }
    );
  },
  setToken: function (token) {
    this._token = token;
    this.init();
  },
  removeToken: function () {
    this._token = null;
  },
  get: function (path, queryParams, headers) {
    return this._axios.get(path, {
      params: queryParams,
      headers,
    });
  },
  post: function (path, body, queryParams, headers) {
    return this._axios.post(path, body, {
      params: queryParams,
      headers,
    });
  },
  readError: function (error) {
    if (error.response != undefined) {
      const errors = error.response.data.error;
      if (errors instanceof Array) {
        return errors[0];
      } else if (errors instanceof Object) {
        const col = Object.keys(errors)[0];
        const message = Object.values(errors)[0];

        return `${col} ${message}`;
      }

      return errors;
    }

    return "An error occured. Please try again!";
  },
  put: function (path, body) {
    return this._axios.put(path, body);
  },
  delete: function (path, config) {
    return this._axios.delete(path, config);
  },
};

export default Provider;
