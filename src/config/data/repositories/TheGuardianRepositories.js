import Provider from "../Provider";

export default {
  getTopHeadline: async function (query = "orderBy=newest", payload = {}) {
    try {
      const response = await Provider.get("https://content.guardianapis.com/search?api-key=1f5c255d-f5ab-4316-835a-ee6e8b4b5696&" + query, payload);
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
      const response = await Provider.get("https://api.nytimes.com/svc/search/v2/articlesearch.json?api-key=cZUu4ahpmQhsLNCrFoqPlDIqp1ZsVlU4&orderBy=newest&" + query, payload);
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
