import { create } from "zustand";

interface AudioState {
  backgroundMusic: HTMLAudioElement | null;
  hitSound: HTMLAudioElement | null;
  successSound: HTMLAudioElement | null;
  swingSound: HTMLAudioElement | null;
  isMuted: boolean;
  
  // Setter functions
  setBackgroundMusic: (music: HTMLAudioElement) => void;
  setHitSound: (sound: HTMLAudioElement) => void;
  setSuccessSound: (sound: HTMLAudioElement) => void;
  setSwingSound: (sound: HTMLAudioElement) => void;
  
  // Control functions
  toggleMute: () => void;
  playHit: () => void;
  playSuccess: () => void;
  playSwing: () => void;
}

export const useAudio = create<AudioState>((set, get) => ({
  backgroundMusic: null,
  hitSound: null,
  successSound: null,
  swingSound: null,
  isMuted: true, // Start muted by default
  
  setBackgroundMusic: (music) => {
    const { isMuted } = get();
    music.muted = isMuted;
    set({ backgroundMusic: music });
  },
  setHitSound: (sound) => {
    const { isMuted } = get();
    sound.muted = isMuted;
    set({ hitSound: sound });
  },
  setSuccessSound: (sound) => {
    const { isMuted } = get();
    sound.muted = isMuted;
    set({ successSound: sound });
  },
  setSwingSound: (sound) => {
    const { isMuted } = get();
    sound.muted = isMuted;
    set({ swingSound: sound });
  },
  
  toggleMute: () => {
    const { isMuted, backgroundMusic, hitSound, successSound, swingSound } = get();
    const newMutedState = !isMuted;
    
    set({ isMuted: newMutedState });
    
    if (backgroundMusic) backgroundMusic.muted = newMutedState;
    if (hitSound) hitSound.muted = newMutedState;
    if (successSound) successSound.muted = newMutedState;
    if (swingSound) swingSound.muted = newMutedState;
    
    console.log(`Sound ${newMutedState ? 'muted' : 'unmuted'}`);
  },
  
  playHit: () => {
    const { hitSound, isMuted } = get();
    if (hitSound) {
      // If sound is muted, don't play anything
      if (isMuted) {
        console.log("Hit sound skipped (muted)");
        return;
      }
      
      // Clone the sound to allow overlapping playback
      const soundClone = hitSound.cloneNode() as HTMLAudioElement;
      soundClone.volume = 0.3;
      soundClone.play().catch(error => {
        console.log("Hit sound play prevented:", error);
      });
    }
  },
  
  playSuccess: () => {
    const { successSound, isMuted } = get();
    if (successSound) {
      if (isMuted) {
        console.log("Success sound skipped (muted)");
        return;
      }
      
      successSound.currentTime = 0;
      successSound.play().catch(error => {
        console.log("Success sound play prevented:", error);
      });
    }
  },
  
  playSwing: () => {
    const { swingSound, isMuted } = get();
    if (swingSound && !isMuted) {
      const soundClone = swingSound.cloneNode() as HTMLAudioElement;
      soundClone.volume = 0.4;
      soundClone.play().catch(() => {});
    }
  }
}));
