"use client";

import { Ticker, TickerName } from '@/../script/state/repository/ticker';
import useTicker from '@/../script/util/hook/useTicker';

const Component = ({
  tickerName = "EURUSDT", initialTicker, delay = 10000
}:{ tickerName: TickerName, initialTicker?: Ticker, delay?: number }) => {
    
  const ticker = useTicker(tickerName, delay);
  
  return (<>
    {!!initialTicker && !ticker.price && 
      <p>
        <b>
          {initialTicker.symbol}: <code>{initialTicker.price}</code>
        </b>
      </p>
    }
    {!!ticker.price &&
      <p>
        {ticker.symbol}: <code>{ticker.price}</code>
      </p>
    }
  </>);
};

export default Component;
