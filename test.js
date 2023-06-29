/** @param {NS} ns */
export async function main(ns) {
  if ( ns.args.length < 1 ) {
    ns.tprint("no args given")
    ns.exit(1);
  }
  let target = ns.args[0];
  ns.exec("hack-target.js","home",1,target );
  ns.exec("deploy-local.js","home",1,target );

}
// here JWC