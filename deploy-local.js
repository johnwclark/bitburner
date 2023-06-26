/** @param {NS} ns */
export async function main(ns) {

  if ( ns.args.length < 1 ) {
    ns.tprint(" no target given");
    ns.exit(1);
  }
  let target = ns.args[0];
  ns.tprint("target = " + target);

  let script = "local.js";
  ns.scp(script,target);

  let ram = ns.getServerMaxRam(target);
  let used = ns.getScriptRam(script,target);
  let threads = Math.floor( ram / used );
  ns.tprint( "RAM : " + ram + ", script mem :" + used + ", threads : " + threads );

  if ( threads < 1 ) {
    ns.tprint("not enough ram to run " + script);
    ns.exit(1);
  }
  ns.exec(script,target,threads);
  
}
