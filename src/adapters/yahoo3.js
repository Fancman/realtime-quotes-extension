const axios = require("axios");

const marketIndices = [
	"^GSPC",
	"^GSPTSE",
	"^NSEI",
	"^IXIC",
	"^DJI",
	"CADINR=X",
	"CADUSD=X",
	"BTC-CAD",
	"GC=F",
	"CL=F",
	"^TNX",
	"^VIX",
];

const quotesCount = 5;
const searchUrl = `https://query1.finance.yahoo.com/v1/finance/search?quotesCount=${quotesCount}`;
const quoteshUrl = `http://46.28.109.152:3001`;

const { log } = console;

const yahooAPI3 = {
	buildRequest: () => {
		return {
			method: "get",
			headers: {
				Accept: "application/json",
				"Content-Type": "application/json",
			},
		};
	},

	getSummary: async (symbols) => {
		try {
			const searchUrlWithQuery = `${quoteshUrl}/getSummary?symbols=${symbols.join(',')}`;
			const response = await axios(searchUrlWithQuery, yahooAPI3.buildRequest());
			log(response["data"])
			return response["data"]
		} catch (err) {
			log(err);
			return Promise.resolve([]);
		}
	},

	getMarketSummary: async () => {
		return yahooAPI3.getSummary(marketIndices);
	},

	parseQueryResponse: (yahooResponse) => {
		return yahooResponse["data"]["quotes"];
	},

	searchStocks: async (query) => {
		const searchUrlWithQuery = `${searchUrl}&q=${query}`;
		try {
			const response = await axios(searchUrlWithQuery, yahooAPI3.buildRequest());
			return yahooAPI3.parseQueryResponse(response);
		} catch (err) {
			log(err);
			return Promise.resolve([]);
		}
	},
}


export default yahooAPI3;