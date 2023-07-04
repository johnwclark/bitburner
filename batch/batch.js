
/** @param {NS} ns */
export async function main(ns) {
  if ( ns.args.length < 1 ) {
    ns.tprint("missing target name");
    ns.exit(1);
  }
  let target = ns.args[0];
  let host = ns.getHostname();

  ///let info = ns.getServer(target).
  let weakenTime = ns.getWeakenTime(target);
  let growTime = ns.getGrowTime(target);
  let hackTime = ns.getHackTime(target);
  ns.tprint("hack " + hackTime + " weaken " + weakenTime + " grow " + growTime);

  let staggerAmount = 20; // this is the MS between them

  while( true ) {

  
    let stagger = 0;
    let delay = weakenTime - hackTime + stagger;
    ns.exec("/batch/hack.js",host,1,target,delay);
    //ns.tprint("hackTime = " + hackTime + " delay = " + delay );
  
    stagger += staggerAmount;
    delay = stagger;
    ns.exec("/batch/weaken.js",host,1,target,delay);
    //ns.tprint("weakenTime = " + weakenTime + " delay = " + delay );
  
    stagger += staggerAmount;
    delay = weakenTime - growTime + stagger;
    ns.exec("/batch/grow.js",host,1,target,delay);
    //ns.tprint("growTime = " + growTime + " delay = " + delay );
  
    stagger += staggerAmount;
    delay = stagger;
    ns.exec("/batch/weaken.js",host,1,target,delay);
    //ns.tprint("weakenTime = " + weakenTime + " delay = " + delay );
  
    stagger += staggerAmount;
    await ns.sleep(stagger);
  }

}

