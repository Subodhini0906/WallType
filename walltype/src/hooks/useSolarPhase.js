import { useState, useEffect } from "react";
import SunCalc from 'suncalc';
import getPhaseFromTime from '../utils/getPhaseFromTime';

export default function useSolarPhase() {
    const [phase, setPhase] = useState('day');
    useEffect(() => {
        let isMounted = true;
        navigator.geolocation.getCurrentPosition(
            ({ coords }) => {
                const { latitude, longitude } = coords;
                console.log('Latitude:', latitude, 'Longitude:', longitude);
                const times = SunCalc.getTimes(new Date(), latitude, longitude);
                console.log('Solar Times:', times);
                const tms = {
                    dawn: times.nauticalDawn.getTime(),
                    sunrise: times.sunrise.getTime(),
                    sunset: times.sunset.getTime(),
                    dusk: times.nauticalDusk.getTime()
                };
                console.log('Phase Times:', tms);
                function update() {
                    if (isMounted) {
                        const newPhase = getPhaseFromTime(tms, new Date());
                        console.log('Current Phase:', newPhase);
                        setPhase(newPhase);
                    }
                }
                update();
                const id = setInterval(update, 60 * 1000);
                return () => {
                    clearInterval(id);
                    isMounted = false;
                };
            },
            (err) => {
                console.error('Geolocation error:', err);
                if (isMounted) setPhase('night'); // Fallback to night
            },
            { enableHighAccuracy: false }
        );
    }, []);
    return phase;
}