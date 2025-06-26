export default function WallpaperDisplay({ image, phase }) {
    const filters = {
      dawn: 'brightness-90 contrast-110',
      day: 'brightness-100',
      golden: 'brightness-105 hue-rotate-5',
      dusk: 'brightness-95 contrast-105 invert-5',
      night: 'brightness-80 contrast-90 saturate-80'
    };
  
    return (
      <div
        className={`absolute inset-0 bg-cover bg-center ${filters[phase]}`}
        style={{ backgroundImage: image ? `url(${image})` : 'none' }}
      />
    );
  }