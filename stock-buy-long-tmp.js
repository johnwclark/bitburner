
/** @param {NS} ns */
export async function main(ns) {

  let minimumForecastValue = 0.6;
  let sellForecastValue = 0.55;
  let percentToInvest = 0.9;
  let symPurchased = new Array;
  let sharesPurchased = new Array;

  while(true) {


    let symArry = ns.stock.getSymbols();
    let forecastArray = new Array;
    let forecastRankings = new Array;
    forecastRankings.push(-1);

    // find the best forecast value
    let largestIndex = 0;
    for( let i = 0 ; i < symArry.length ; ++i ) {
      let sym = symArry[i];
      let forecast = ns.stock.getForecast(sym);
      forecastArray.push(forecast);
      //ns.tprint( "forcast for " + sym + " : " + forecast );
      if ( forecastArray[i] > forecastArray[largestIndex]) {
        largestIndex = i;
        forecastRankings.push(i);
      }
    }

    let maxMoney = Math.floor( ns.getPlayer().money * percentToInvest );
    largestIndex = forecastRankings.pop();
    while ( largestIndex != -1 ) {
      ns.tprint( "best choice is " + symArry[largestIndex] + " : " + forecastArray[largestIndex] );

      // now buy the stock if our money holds out and the forecast is good
      if ((maxMoney > 0) && (forecastArray[largestIndex] > minimumForecastValue)) {

        // get the number of shares
        let sym = symArry[largestIndex];
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
    
        // make the purchase and store the info
        let pps = ns.stock.buyStock(sym,shares);
        let purchasePrice = pps * shares;
        ns.tprint("purchased " + shares + " of " + sym + " for " + purchasePrice );
        symPurchased.push(sym);
        sharesPurchased.push(shares);
        maxMoney -= purchasePrice;
      }
      // get the next one
      largestIndex = forecastRankings.pop();
    }

    ns.tprint(" end of BUY section ");

    // check all of our currently owned stocks
    for ( let i = 0 ; i < symPurchased.length ; ++i ) {

      let sym = symPurchased[i];
      let shares = sharesPurchased[i];
      // sell if we are below the threshold
      if ( ns.stock.getForecast(sym) < sellForecastValue ) {
        let sellpps = ns.stock.sellStock(sym,shares);
        let salePrice = sellpps * shares;
        maxMoney += salePrice;
        ns.tprint("sold " + shares + " of " + sym + " for " + salePrice );
        let profit = salePrice - purchasePrice;
        ns.tprint(" ... profit amount = " + profit );

        // shift the values forward one spot
        for ( let j = i ; j < (symPurchased.length - 1) ; ++j ) {
          symPurchased[j] = symPurchased[j+1];
          sharesPurchased[j] = sharesPurchased[j+1];
        }
        --i;
      }
      
    }
    ns.tprint(" end of SELL section ");
    await ns.sleep(5000); // sleep a bit
  } // loop around and do it again
}

