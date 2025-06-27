import useSolarPhase from './hooks/useSolarPhase';
import WallpaperDisplay from './components/WallpaperDisplay';

const phaseImages = {
  dawn: './dawn.jpg',
  day: './day.jpg',
  golden: './nght.jpg',
  dusk: './nght1.jpg',
  night: './Day1.jpg',
};

function App() {
  const phase = useSolarPhase();

  return (
    <div className="App relative w-full h-screen overflow-hidden">
      <WallpaperDisplay image={phaseImages[phase]} phase={phase} />
    </div>
  );
}

export default App;