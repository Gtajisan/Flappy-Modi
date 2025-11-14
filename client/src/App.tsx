import { useEffect } from "react";
import FlappyGame from "./components/FlappyGame";
import { useAudio } from "./lib/stores/useAudio";
import "@fontsource/inter";

function App() {
  const { setBackgroundMusic, setHitSound, setSuccessSound, setSwingSound } = useAudio();

  useEffect(() => {
    const bgMusic = new Audio("/audio/music.mp3");
    bgMusic.loop = true;
    bgMusic.volume = 0.3;
    setBackgroundMusic(bgMusic);

    const hitSfx = new Audio("/audio/hit.mp3");
    hitSfx.volume = 0.5;
    setHitSound(hitSfx);

    const winSfx = new Audio("/audio/win.mp3");
    winSfx.volume = 0.4;
    setSuccessSound(winSfx);
    
    const swingSfx = new Audio("/audio/swing.mp3");
    swingSfx.volume = 0.4;
    setSwingSound(swingSfx);
  }, [setBackgroundMusic, setHitSound, setSuccessSound, setSwingSound]);

  return <FlappyGame />;
}

export default App;
