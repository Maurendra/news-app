import Provider from "../Provider";

export default {
  getTopHeadline: async function (query = "", payload = {}) {
    try {
      const response = await Provider.get("https://api.nytimes.com/svc/mostpopular/v2/emailed/7.json?api-key=cZUu4ahpmQhsLNCrFoqPlDIqp1ZsVlU4&" + query, payload);
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
  getNews: async function (query = "q=election", payload = {}) {
    try {
      const response = await Provider.get("https://api.nytimes.com/svc/search/v2/articlesearch.json?api-key=cZUu4ahpmQhsLNCrFoqPlDIqp1ZsVlU4&" + query, payload);
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
