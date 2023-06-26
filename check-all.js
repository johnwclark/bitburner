/** @param {NS} ns */
export async function main(ns) {
  let scanRval = recursiveScan(ns);
  //ns.tprint( scanRval );

  for( let i = 0 ; i < scanRval.length ; ++i ) {
    let target = scanRval[i];
    if ( ! target.startsWith("pserv") && target != "home" ) {
      ns.tprint("working on host : " + target);
      if ( ns.hasRootAccess(target) ) {
        ns.tprint("already have root access");
      } else {
        let hl = ns.getHackingLevel(target);
        let rhl = ns.getServerRequiredHackingLevel(target);
        if ( rhl > hl ) {
          ns.tprint("hacking level too high")
          ns.exit(2);
        } else {
          await ns.exec("hack_target.js",target,1,target);
          ns.tprint("hacked " + target);
          await ns.exec("deploy_local.js","home",1,target);
        }
      }
    }
  }

}

/** @param {NS} ns */
export function recursiveScan(ns){
	let i = 0;
	let servers = ns.scan("home");
	let depth = determineRecurse(ns);
	
	let serverSet = new Set(servers);

	while (i < depth){

		for (let serverName of Array.from(serverSet)) {
			
			serverSet.add(serverName)
			let networkScan = ns.scan(serverName);

			for (let hostName of networkScan){
				serverSet.add(hostName)
			}
		}
		i++;
	}
	return (Array.from(serverSet))
}

/** @param {NS} ns */
export function determineRecurse(ns){
	let recursive = 2;
	if (ns.fileExists("DeepscanV1.exe")) {
		recursive = 5;
	}
	if (ns.fileExists("DeepscanV2.exe")) {
		recursive = 10;
	}
	return recursive;
}
