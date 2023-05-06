import { TickerName } from "@/../script/state/repository/ticker";

export interface KLine {
    openTime: number;
    open: string;
    high: string;
    low: string;
    close: string;
    volume: string;
    closeTime: number;
    quoteAssetVolume: string;
    numberOfTrades: number;
    takerBuyBaseAssetVolume: string;
    takerBuyQuoteAssetVolume: string;
    ignore: string;
  }
  
  export const fetchKLine = async (tickerSymbol: TickerName = "EURUSDT", timeframe: string = "1m"): Promise<KLine[]> => {
    try {
      const response = await fetch(`https://api.binance.com/api/v3/klines?symbol=${tickerSymbol}&interval=${timeframe}`);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      return await response.json();
    } catch (error) {
      console.error(error);
      throw new Error(`Failed to fetch kline for symbol ${tickerSymbol} with timeframe ${timeframe}`);
    }
  };
  