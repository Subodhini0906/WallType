import { useState, useEffect } from "react";
import SunCalc from 'suncalc';
import getPhaseFromTime from '../utils/getPhaseFromTime';

export default function useSolarPhase(coords) {
  const [phase, setPhase] = useState('day');

  useEffect(() => {
    if (!coords) return;

    let isMounted = true;

    function update() {
      const now = new Date();
      const times = SunCalc.getTimes(now, coords.latitude, coords.longitude);

      console.log('✅ Now:', now);
      console.log('🌄 Dawn:', times.nauticalDawn);
      console.log('🌅 Sunrise:', times.sunrise);
      console.log('🌇 Sunset:', times.sunset);
      console.log('🌃 Dusk:', times.nauticalDusk);

      const tms = {
        dawn: times.nauticalDawn?.getTime() || 0,
        sunrise: times.sunrise?.getTime() || 0,
        sunset: times.sunset?.getTime() || 0,
        dusk: times.nauticalDusk?.getTime() || 0,
      };

      const newPhase = getPhaseFromTime(tms, now);
      console.log('🟢 Phase:', newPhase);

      if (isMounted) setPhase(newPhase);
    }

    update();
    const id = setInterval(update, 60000);
    return () => {
      isMounted = false;
      clearInterval(id);
    };
  }, [coords]);

  return phase;
}
