import React, { useState, useEffect } from 'react';
import useSolarPhase from '../hooks/useSolarPhase';
import DropzoneUploader from './DropzoneUploader';
import LocationSelector from './LocationSelector';
import './WallpaperDisplay.css';

const defaultPhaseImages = {
  dawn: './dawn.jpg',
  day: './day.jpg',
  golden: './golden.jpg',
  dusk: './dusk.jpg',
  night: './night.jpg',
};

export default function WallpaperDisplay() {
  const [coords, setCoords] = useState({ latitude: 28.6139, longitude: 77.2090 }); // default New Delhi
  const phase = useSolarPhase(coords);

  const [userImages, setUserImages] = useState({});
  const [currentImage, setCurrentImage] = useState(defaultPhaseImages[phase]);
  const [previousImage, setPreviousImage] = useState(null);
  const [isFading, setIsFading] = useState(false);

  const phaseImage = userImages[phase] || defaultPhaseImages[phase];

  useEffect(() => {
    if (!phaseImage) return;

    if (phaseImage !== currentImage) {
      setPreviousImage(currentImage);
      setCurrentImage(phaseImage);
      setIsFading(true);
      const timeout = setTimeout(() => {
        setPreviousImage(null);
        setIsFading(false);
      }, 1000);
      return () => clearTimeout(timeout);
    }
  }, [currentImage, phase, phaseImage]);

  const handleUpload = (imageData) => {
    setUserImages((prev) => ({
      ...prev,
      [phase]: imageData,
    }));
  };

  return (
    <>
      <div className="wallpaper-container">
        {previousImage && (
          <div
            className="wallpaper fade-out"
            style={{ backgroundImage: `url(${previousImage})` }}
          />
        )}
        <div
          className={`wallpaper ${isFading ? 'fade-in' : ''}`}
          style={{ backgroundImage: `url(${currentImage})` }}
        />
      </div>

      <LocationSelector onLocationChange={setCoords} />

      <div className="absolute bottom-4 left-4 w-64">
        <DropzoneUploader onUpload={handleUpload} />
        <p className="mt-2 text-white">Current Phase: <strong>{phase}</strong></p>
      </div>
    </>
  );
}
