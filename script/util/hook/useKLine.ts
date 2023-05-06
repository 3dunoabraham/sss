import { useState, useEffect } from 'react';
import { TickerName,  } from '@/../script/state/repository/ticker';
import { KLine, fetchKLine } from '@/../script/state/repository/kline';

export default function useKLine(tickerName: TickerName, timeframe: string, delay: number): KLine[] {
  const [kline, setKLine] = useState<KLine[]>([]);

  const getfetchKLine = async () => {
    try {
      const newKLine = await fetchKLine(tickerName, timeframe);
      setKLine(newKLine);
    } catch (e:any) {
      return
    }
  };

  useEffect(() => {
    getfetchKLine();
    const intervalId = setInterval(fetchKLine, delay);
    return () => clearInterval(intervalId);
  }, [tickerName, timeframe]);

  return kline;
};