import React, { useEffect } from "react";
import "./App.scss";
import Tab from "./components/Tab";
import Tabs from "./components/Tabs";
import MarketSummary from "./pages/MarketSummary";
import Watchlist from "./pages/Watchlist";

function App() {
	useEffect(() => {
		fetch('https://finance.yahoo.com/quote/VZ')
			.then(resp => {
				console.log(resp);
				console.log('======success=======');

				// Use the `get` method to access the 'set-cookie' header
				const setCookieHeader = resp.headers.get('set-cookie');
				console.log(setCookieHeader);
			})
			.catch(err => {
				console.log('======failure=======');
				console.log(err);
			});

	}, []);

	return (
		<Tabs>
			<Tab tabName={"Market Summary"}>
				<MarketSummary />
			</Tab>
			<Tab tabName={"Watchlist"}>
				<Watchlist />
			</Tab>
		</Tabs>
	);
}

export default App;
