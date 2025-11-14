import { useEffect } from "react";
import FlappyGame from "./components/FlappyGame";
import { useAudio } from "./lib/stores/useAudio";
import "@fontsource/inter";

function App() {
  const { setBackgroundMusic, setHitSound, setSuccessSound } = useAudio();

  useEffect(() => {
    const bgMusic = new Audio("/sounds/background.mp3");
    bgMusic.loop = true;
    bgMusic.volume = 0.3;
    setBackgroundMusic(bgMusic);

    const hitSfx = new Audio("/sounds/hit.mp3");
    hitSfx.volume = 0.5;
    setHitSound(hitSfx);

    const successSfx = new Audio("/sounds/success.mp3");
    successSfx.volume = 0.4;
    setSuccessSound(successSfx);
  }, [setBackgroundMusic, setHitSound, setSuccessSound]);

  return <FlappyGame />;
}

export default App;
