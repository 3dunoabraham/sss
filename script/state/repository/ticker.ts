export const TICKER_SYMBOLS = ['EURUSDT', 'USDCUSDT', 'BTCUSDT', 'ETHUSDT', 'FTMUSDT', 'LINKUSDT'] as const;
export type TickersSymbols = typeof TICKER_SYMBOLS;
export type TickerName = TickersSymbols[number];

export interface Ticker {
  symbol: string;
  price: string;
}

export const fetchTicker = async ( tickerSymbol:TickerName = "EURUSDT" ): Promise<Ticker> => {
  try {
    const response = await fetch(`https://api.binance.com/api/v3/ticker/price?symbol=${tickerSymbol}`);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    return await response.json();
  } catch (error) {
    console.error(error);
    throw new Error(`Failed to fetch ticker for symbol ${tickerSymbol}`);
  }
}
