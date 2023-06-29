

/** @param {NS} ns */
export async function main(ns) {
    let locations = ns.infiltration.getPossibleLocations();

    let maxTradeRep = 0;
    let maxSellCash = 0;

    for (let i = 0; i < locations.length; ++i) {
        let target = locations[i];
        ns.tprint(" location : " + JSON.stringify(target));
        let details = ns.infiltration.getInfiltration(target.name)
        //ns.tprint( " details : " + JSON.stringify(details) );

        if (details.reward.sellCash > maxSellCash) {
            maxSellCash = details.reward.sellCash;
            ns.tprint(" new max cash at " + target.name);
        }

    }
    ns.tprint(" max cash : " + maxSellCash);

}