import React from "react";
import { ReactComponent as IconRefresh } from "./icon_refresh.svg";
import yahoo from "../../adapters/yahoo";
import WebTMX from "../../adapters/webtmx";

const asyncFunctions = [
  yahoo.getMarketSummary(),
  WebTMX.getMarketSummary()
];

class MarketSummary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { stocks: [] };
  }

  async reloadStockPrices() {
    let stocks = await Promise.race(asyncFunctions);
    this.setState({ stocks });
  }

  async componentDidMount() {

    let stocks = await Promise.race(asyncFunctions);
    this.setState({ stocks });
  }

  render() {
    let { stocks } = this.state;
    return (
      <div className="page">
        <div className="settings clearfix">
          <div className="pull-left">Market Indices</div>
          <div
            className="reload-btn pull-right"
            onClick={this.reloadStockPrices.bind(this)}
          >
            <IconRefresh />
          </div>
        </div>
        <div className="indices">
          {stocks.map((stock, index) => (
            <div className="index" key={index}>
              <div className="first-row clearfix">
                <span className="pull-left truncate">
                  <span>{stock.companyName}</span>
                </span>
                <span className="current-price pull-right">{stock.price}</span>
              </div>
              <div className="second-row clearfix">
                <span className="ticker pull-left">
                  <a
                    target="_blank"
                    rel="noreferrer"
                    href={
                      "https://www.google.com/search?q=" +
                      encodeURIComponent(stock.companyName + " share price")
                    }
                  >
                    {stock.ticker}
                  </a>
                </span>
                {stock.priceChange >= 0 ? (
                  <span className="change bull pull-right">
                    +{stock.priceChange} (+{stock.percentChange}%)
                  </span>
                ) : (
                  <span className="change bear pull-right">
                    {stock.priceChange} ({stock.percentChange}%)
                  </span>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }
}

export default MarketSummary;
