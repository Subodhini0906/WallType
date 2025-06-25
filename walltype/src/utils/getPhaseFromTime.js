export function getPhaseFromTime({sunrise,sunset,dawn,dusk},now=new Date()){
    const t=now.getTime();
    if(t>=dawn && t<sunrise) return 'dawn';
    if(t>=sunrise && t<sunset-60*60*1000) return 'day';
    if(t>=sunset-60*60*1000 && t<sunset+60*60*1000) return 'golden';
    if(t>=sunset+60*60*1000 && t<dusk) return 'dusk';
    return 'night';
}