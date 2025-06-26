import useSolarPhase from './hooks/useSolarPhase';
import WallpaperDisplay from './components/WallpaperDisplay';

const phaseImages = {
  dawn: '/nght.jpg',
  day: '/Day1.jpg',
  golden: '/day2.jpg',
  dusk: '/night1.jpg',
  night: '/day.jpg'
};

function App() {
  const phase = useSolarPhase();

  return (
    <div className="App relative w-full h-screen overflow-hidden">
      <WallpaperDisplay image={phaseImages[phase]} phase={phase} />
      <div className="relative z-10 p-8 space-y-4 text-white">
        <p>Current phase: <strong>{phase}</strong></p>
      </div>
    </div>
  );
}

export default App;