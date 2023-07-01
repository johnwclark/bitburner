/** @param {NS} ns */
export async function main(ns) {

  let karma = ns.heart.break();
  ns.tprint("karma = " + karma);

  let killed = ns.getPlayer().numPeopleKilled;
  ns.tprint("killed = " + killed);

}
