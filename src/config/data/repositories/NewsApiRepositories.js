import Provider from "../Provider";

export default {
  getNews: async function (query = "q=news", payload = {}) {
    try {
      const response = await Provider.get("https://newsapi.org/v2/everything?apiKey=cfe135c1b9114664ad5220d573a74acf&sortBy=publishedAt&" + query, payload);
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
  getTopHeadline: async function (query = "country=us", payload = {}) {
    try {
      const response = await Provider.get("https://newsapi.org/v2/top-headlines?apiKey=cfe135c1b9114664ad5220d573a74acf&" + query, payload);
      return {
        error: false,
        data: response.data,
      };
    } catch (error) {
      return {
        error: true,
        message: error,
      };
    }
  },
};
