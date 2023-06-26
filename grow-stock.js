/** @param {NS} ns */
export async function main(ns) {
  if ( ns.args.length < 1 ) {
    ns.tprint(" no target given");
    ns.exit(1);
  }
  let target = ns.args[0];
  ns.tprint("target = " + target);

  while ( true ) {
    await ns.grow("joesguns", { stock: true });
    await ns.sleep(1000);
  }
}
