import SunCalc from 'suncalc';
export function useSolarPhase(coords){
    const now=new Date();
    const times=SunCalc.getTimes(now,coords.lat,coords.lon);
    if(now<times.sunrise) return 'night';
    if(now<times.goldenHourEnd) return 'sunrise';
    if(now<times.sunsetStart) return 'day';
    if(now<times.dusk) return 'sunset';
    return 'night';
}