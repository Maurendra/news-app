import Provider from "../Provider";

export default {
  register: async function (payload = {}) {
    try {
      const response = await Provider.post("http://127.0.0.1:8000/api/users/", payload);
      console.log(response);
      return {
        error: false,
        data: response.data,
      };
    } catch (error) {
      return {
        error: true,
        message: Provider.readError(error),
      };
    }
  },
  login: async function (payload = {}) {
    try {
      const response = await Provider.post("http://127.0.0.1:8000/api/login/", payload);
      console.log(response);
      return {
        error: false,
        data: response.data,
      };
    } catch (error) {
      return {
        error: true,
        message: Provider.readError(error),
      };
    }
  },
};
