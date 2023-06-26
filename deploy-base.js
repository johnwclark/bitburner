/** @param {NS} ns **/

export async function main(ns) {
	let maxServers = ns.getPurchasedServerLimit();
  let script = "base.js";

  ns.tprint("deploying " + script + " to " + maxServers + " servers")
  for (let i = 0; i < maxServers; i++) {
    let serverName = "pserv-" + i;
    if (ns.serverExists(serverName)) {
      ns.tprint(" to server " + serverName );
      ns.killall(serverName);
      ns.scp(script, serverName);

      let ram = ns.getServerMaxRam(serverName);
      let used = ns.getScriptRam(script,serverName);
      let threads = Math.floor( ram / used );
      ns.tprint( "RAM : " + ram + ", script mem :" + used + ", threads : " + threads )
      ns.exec(script, serverName, threads);
    }
  }
}
