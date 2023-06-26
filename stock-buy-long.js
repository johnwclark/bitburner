let minimumForecastValue = 0.6;
let sellForecastValue = 0.55;

/** @param {NS} ns */
export async function main(ns) {

  while(true) {

    let symArry = ns.stock.getSymbols();
    let forecastArray = new Array;
    // find the best forecast value
    let largestIndex = 0;
    for( let i = 0 ; i < symArry.length ; ++i ) {
      let sym = symArry[i];
      let forecast = ns.stock.getForecast(sym);
      forecastArray.push(forecast);
      //ns.tprint( "forcast for " + sym + " : " + forecast );
      if ( forecastArray[i] > forecastArray[largestIndex]) {
        largestIndex = i;
      }
    }
    ns.tprint( "best choice is " + symArry[largestIndex] + " : " + forecastArray[largestIndex] );
    if ( forecastArray[largestIndex] < minimumForecastValue ) {
      ns.tprint("no value larger than " + minimumForecastValue );
      ns.exit(1);
    } else {
      // get the number of shares
      let sym = symArry[largestIndex];
      let maxMoney = Math.floor( ns.getPlayer().money * 0.9 );
      ns.tprint("looking to invest " + maxMoney + " in " + sym );
      let pricePerShare = ns.stock.getPrice(sym);
      let shares = Math.floor(maxMoney / pricePerShare );
      ns.tprint("shares to buy = " + shares + " at " + pricePerShare);
  
      // just in case there aren't that many
      let sysMS = ns.stock.getMaxShares(sym);
      if (sysMS < shares) {
        shares = sysMS;
        ns.tprint("limited by Max = " + shares);
      }
  
      // make the purchase
      let pps = ns.stock.buyStock(sym,shares);
      let purchasePrice = pps * shares;
      ns.tprint("purchased " + shares + " of " + sym + " for " + purchasePrice );
  
      // hold while we are more likely to go up
      while( ns.stock.getForecast(sym) > sellForecastValue ) {
        // sleep a bit
        //ns.tprint(".");
        await ns.sleep(1200);
      }
      
      // forecast has dipped too low, sell
      let sellpps = ns.stock.sellStock(sym,shares);
      let salePrice = sellpps * shares;
  
      ns.tprint("sold " + shares + " of " + sym + " for " + salePrice );
      let profit = salePrice - purchasePrice;
      ns.tprint(" ... profit amount = " + profit );
    }
  
  } // loop around and do it again
}
