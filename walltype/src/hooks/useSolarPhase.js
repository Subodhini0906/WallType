import { useState, useEffect } from "react";
import SunCalc from 'suncalc';
import getPhaseFromTime from '../utils/getPhaseFromTime';

export default function useSolarPhase() {
  const [phase, setPhase] = useState('day');
  const [coords, setCoords] = useState(null);

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      ({ coords }) => {
        const { latitude, longitude } = coords;
        setCoords({ latitude, longitude });
      },
      (err) => {
        console.error('Geolocation error:', err);
        setPhase('night'); // fallback
      },
      { enableHighAccuracy: false }
    );
  }, []);

  useEffect(() => {
    if (!coords) return;

    let isMounted = true;

    function update() {
      if (isMounted) {
        const times = SunCalc.getTimes(new Date(), coords.latitude, coords.longitude);
        const tms = {
          dawn: times.nauticalDawn.getTime(),
          sunrise: times.sunrise.getTime(),
          sunset: times.sunset.getTime(),
          dusk: times.nauticalDusk.getTime(),
        };
        const newPhase = getPhaseFromTime(tms, new Date());
        setPhase(newPhase);
      }
    }

    update(); // run immediately
    const intervalId = setInterval(update, 60 * 1000);

    return () => {
      isMounted = false;
      clearInterval(intervalId);
    };
  }, [coords]);

  return phase;
}
