/**Below is a quick-script to determine the servers of each organization.
 * Steps for setup:
 * 1) use ns.stock.getSymbols() function to get all stock symbols
 * 2) manually map the symbols to the organization names in the second column
 * 3) copy paste the map into getMap and then call generateMap() in a ns.tprint call
 * 4) copy final map into the getMap() function below
*/

function generateNewMap(ns) {
	var map = getMap();
	var iniTarget = ns.getHostname();
	map = updateMap(ns, iniTarget, map, true);
	return map;
}

/*
	Below is a meticulously curated symbol -> server list
*/
function getMap() {

	var symbolMap = [
		["AERO","AeroCorp","aerocorp"],
		["APHE","Alpha Enterprises","alpha-ent"],
		["BLD","Blade Industries","blade"],
		["CLRK","Clarke Incorporated","clarkinc"],
		["CTK","CompuTek","comptek"],
		["CTYS","Catalyst Ventures","catalyst"],
		["DCOMM","DefComm","defcomm"],
		["ECP","ECorp","ecorp"],
		["FLCM","Fulcrum Technologies","fulcrumassets"],
		["FNS","FoodNStuff","foodnstuff"],
		["FSIG","Four Sigma","4sigma"],
		["GPH","Global Pharmaceuticals","global-pharm"],
		["HLS","Helios Labs","helios"],
		["ICRS","Icarus Microsystems","icarus"],
		["JGN","Joe's Guns","joesguns"],
		["KGI","KuaiGong International","kuai-gong"],
		["LXO","LexoCorp","lexo-corp"],
		["MDYN","Microdyne Technologies","microdyne"],
		["MGCP","MegaCorp","megacorp"],
		["NTLK","NetLink Technologies","netlink"],
		["NVMD","Nova Medical","nova-med"],
		["OMGA","Omega Software","omega-net"],
		["OMN","Omnia Cybersystems","omnia"],
		["OMTK","OmniTek Incorporated","omnitek"],
		["RHOC","Rho Contruction","rho-construction"],
		["SGC","Sigma Cosmetics","sigma-cosmetics"],
		["SLRS","Solaris Space Systems","solaris"],
		["STM","Storm Technologies","stormtech"],
		["SYSC","SysCore Securities","syscore"],
		["TITN","Titan Laboratories","titan-labs"],
		["UNV","Universal Energy","univ-energy"],
		["VITA","VitaLife","vitalife"],
		["WDS","Watchdog Security",""]
	];

	return symbolMap;

}

/** @param {NS} ns **/
function updateMap(ns, target, map, initTarget=false) {
	var server = ns.getServer(target);

	if(server.organizationName.toLowerCase().includes("watch")) {
		ns.tprint("Watchdog server is probably " + server.hostname);
	}

	for (var index = 0; index < map.length; index++) {
		if(server.organizationName == map[index][1]) {
			if(debug) { ns.tprint("Found organization " + server.organizationName + " for symbol " + map[index][0]); }
			map[index][2] = server.hostname;
		}
	}

	var targets = ns.scan(target);

	if(debug) { ns.tprint("Target " + target + " knows these servers: " + targets); }

	for (var targetIndex = 0; targetIndex < targets.length; targetIndex++) {
		
		if(!initTarget && targetIndex == 0) //skip the first server as it's always where we came from, except for the server we start on
		{ 
			targetIndex++;
			if (targetIndex >= targets.length){
				return map;
			}
		}
		
		if(debug) { ns.tprint("Target " + targetIndex + " is " + targets[targetIndex]); }
		
		map = updateMap(ns, targets[targetIndex], map);
	}

	return map;
}