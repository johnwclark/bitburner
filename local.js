/** @param {NS} ns */
export async function main(ns) {
  let target = ns.getHostname();
  //ns.tprint("target = " + target);

  // only hack if it has 75% of the server's max money
  let moneyThresh = ns.getServerMaxMoney(target) * 0.75;
  
  // Defines the maximum security level the target server can
  // have. If the target's security level is higher than this,
  // we'll weaken it before doing anything else
  let securityThresh = ns.getServerMinSecurityLevel(target) + 5;
  
  // Infinite loop that continously hacks/grows/weakens the target server
  while(true) {
      if (ns.getServerSecurityLevel(target) > securityThresh) {
          // If the server's security level is above our threshold, weaken it
          await ns.weaken(target);
      } else if (ns.getServerMoneyAvailable(target) < moneyThresh) {
          // If the server's money is less than our threshold, grow it
          await ns.grow(target);
      } else {
          // Otherwise, hack it
          await ns.hack(target);
      }
  }
}
