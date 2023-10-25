const finnhub = require('finnhub');

const api_key = finnhub.ApiClient.instance.authentications['api_key'];
api_key.apiKey = "ckru69pr01qstsqsh9agckru69pr01qstsqsh9b0" // Replace this
const finnhubClient = new finnhub.DefaultApi()

const finhubAPI = {
	searchStocks: async (query) => {
		const searchUrlWithQuery = `${searchUrl}&q=${query}`;
		try {
			const response = await axios(searchUrlWithQuery, yahooAPI2.buildRequest());
			return yahooAPI2.parseQueryResponse(response);
		} catch (err) {
			log(err);
			return Promise.resolve([]);
		}
	},
}