/** @param {NS} ns */
export async function main(ns) {
  let scanRval = recursiveScan(ns);
  ns.tprint( scanRval );

  for( let i = 0 ; i < scanRval.length ; ++i ) {
    if ( ! scanRval[i].startsWith("pserv") && scanRval[i] != "home" ) {
      let target = scanRval[i];
      ns.tprint("working on host : " + target);
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
