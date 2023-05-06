import { useState, useEffect } from 'react';
import { Ticker, TickerName, fetchTicker } from '@/../script/state/repository/ticker';

export default function useTicker (tickerName: TickerName, delay: number) {
  const [ticker, setTicker] = useState<Ticker>({ symbol: '', price: '' });

  const retieveTicker = async () => {
    const newTicker = await fetchTicker(tickerName);
    setTicker(newTicker);
  };

  useEffect(() => {
    retieveTicker()
    const intervalId = setInterval(retieveTicker, delay);
    return () => clearInterval(intervalId);
  }, [tickerName]);

  return ticker;
};
