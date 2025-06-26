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
                const times = SunCalc.getTimes(new Date(), latitude, longitude);
                const tms = {
                    dawn: times.nauticalDawn.getTime(),
                    sunrise: times.sunrise.getTime(),
                    sunset: times.sunset.getTime(),
                    dusk: times.nauticalDusk.getTime()
                };
                function update() {
                    if (isMounted) {
                        setPhase(getPhaseFromTime(tms, new Date()));
                    }
                }
                update();
                const id = setInterval(update, 60 * 1000);
                return () => {
                    clearInterval(id);
                    isMounted = false;
                };
            },
            (err) => console.error('Geolocation error:', err),
            { enableHighAccuracy: false }
        );
    }, []);
    return phase;
}