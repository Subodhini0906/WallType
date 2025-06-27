import React, { useEffect, useState } from 'react';
import useSolarPhase from '../hooks/useSolarPhase';
import DropzoneUploader from './DropzoneUploader';
import './WallpaperDisplay.css';

const defaultPhaseImages = {
  dawn: '/wallpapers/dawn.jpg',
  day: '/wallpapers/day.jpg',
  golden: '/wallpapers/golden.jpg',
  dusk: '/wallpapers/dusk.jpg',
  night: '/wallpapers/night.jpg',
};

export default function WallpaperDisplay() {
  const phase = useSolarPhase();
  const [userImages, setUserImages] = useState({});
  const [currentImage, setCurrentImage] = useState(defaultPhaseImages[phase]);
  const [previousImage, setPreviousImage] = useState(null);
  const [isFading, setIsFading] = useState(false);

  const phaseImage = userImages[phase] || defaultPhaseImages[phase];

  useEffect(() => {
    const newImage = phaseImage;
    if (newImage !== currentImage) {
      setPreviousImage(currentImage);
      setCurrentImage(newImage);
      setIsFading(true);

      const timeout = setTimeout(() => {
        setPreviousImage(null);
        setIsFading(false);
      }, 1000);

      return () => clearTimeout(timeout);
    }
  }, [currentImage, phase, phaseImage, userImages]);

  const handleUpload = (imageData) => {
    // Replace current phase image with uploaded one
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

      <div className="absolute bottom-4 left-4 w-64">
        <DropzoneUploader onUpload={handleUpload} />
        <p className="mt-2 text-white">Uploading replaces wallpaper for: <strong>{phase}</strong></p>
      </div>
    </>
  );
}
