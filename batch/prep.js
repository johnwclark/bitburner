


/** @param {NS} ns */
export async function main(ns) {
  if (ns.args.length < 1) {
    ns.tprint("missing target name");
    ns.exit(1);
  }
  let target = ns.args[0];

  let maxMoney = ns.getServerMaxMoney(target);
  let minSec = ns.getServerMinSecurityLevel(target);
  ns.tprint( "maxMoney " + maxMoney + " minSec " + minSec );
  let done = false;

  let currSec = ns.getServerSecurityLevel(target);
  let currMoney = ns.getServerMoneyAvailable(target);

  while (!done) {

    if ( currMoney < maxMoney ) {
      await ns.grow(target);
      currMoney = ns.getServerMoneyAvailable(target);
      ns.tprint(" currMoney = " + currMoney );
    }
    if ( currSec > minSec ) {
      await ns.weaken(target);
      currSec = ns.getServerSecurityLevel(target);
      ns.tprint(" currSec = " + currSec );
    }

    if (( currMoney == maxMoney ) && ( currSec == minSec )) {
      done = true;
    }
  }
  ns.tprint(target + " at security level " + ns.getServerSecurityLevel(target) + " with $" + ns.getServerMoneyAvailable(target));

}
