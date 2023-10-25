const yahooFinance = require('yahoo-finance2').default;
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

const { log } = console;

const yahooAPI2 = {
	buildRequest: () => {
		return {
			method: "get",
			headers: {
				Accept: "application/json",
				"Content-Type": "application/json",
			},
		};
	},

	parseSummaryResponse: (stock) => {
		return {
			ticker: stock.symbol,
			companyName: stock.shortName,
			price: stock.regularMarketPrice.toFixed(2),
			priceChange: stock.regularMarketChange.toFixed(2),
			percentChange: stock.regularMarketChangePercent.toFixed(2),
			currency: stock.currency,
			exchange: stock.exchange,
			marketState: stock.marketState,
		};
	},

	getSummary: async (symbols) => {
		try {
			const results = []
			for (let symbol of symbols) {
				const quoteResponse = await yahooFinance.quote(symbol)
				const parsedQuote = yahooAPI2.parseSummaryResponse(quoteResponse)
				results.push(parsedQuote)
			}
			return results
		} catch (err) {
			log(err);
			return Promise.resolve([]);
		}
	},

	getMarketSummary: async () => {
		return yahooAPI2.getSummary(marketIndices);
	},

	parseQueryResponse: (yahooResponse) => {
		return yahooResponse["data"]["quotes"];
	},

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


export default yahooAPI2;