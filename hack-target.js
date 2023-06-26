/** @param {NS} ns */
export async function main(ns) {

  if ( ns.args.length < 1 ) {
    ns.tprint("no target machine name provided");
    ns.exit(1);
  }

  let target = ns.args[0];
  ns.tprint("target = " + target);

  let portsNeeded = ns.getServerNumPortsRequired(target);
  ns.tprint("portsNeeded = " + portsNeeded);
  let portsOpened = 0;

  if(( portsOpened < portsNeeded ) && (ns.fileExists("BruteSSH.exe", "home"))) {
    ns.brutessh(target);
    ns.tprint("BruteSSH");
    ++portsOpened;
  }
  if(( portsOpened < portsNeeded ) && (ns.fileExists("FTPCrack.exe", "home"))) {
    ns.ftpcrack(target);
    ns.tprint("FTPCrack");
    ++portsOpened;
  }
  if(( portsOpened < portsNeeded ) && (ns.fileExists("HTTPWorm.exe", "home"))) {
    ns.httpworm(target);
    ns.tprint("HTTPWorm");
    ++portsOpened;
  }
  if(( portsOpened < portsNeeded ) && (ns.fileExists("SQLInject.exe", "home"))) {
    ns.sqlinject(target);
    ns.tprint("SQLInject");
    ++portsOpened;
  }
  if(( portsOpened < portsNeeded ) && (ns.fileExists("relaySMTP.exe", "home"))) {
    ns.relaysmtp(target);
    ns.tprint("relaySMTP");
    ++portsOpened;
  }

  if( portsOpened < portsNeeded ) {
    ns.tprint("not enough ports opened to nuke host");
    ns.exit(2);
  } else {
    // Get root access to target server
    ns.nuke(target);
    ns.tprint(target + " has been nuked!!");
    // TODO : add backdoor here when we have it

    ns.scp('local.js',target);
  }
}
