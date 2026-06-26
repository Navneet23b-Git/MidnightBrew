import { create } from 'zustand';

export const useStore = create((set) => ({
  isPreloaderFinished: false,
  setPreloaderFinished: (status) => set({ isPreloaderFinished: status }),
  
  isAudioPlaying: false,
  toggleAudio: () => set((state) => ({ isAudioPlaying: !state.isAudioPlaying })),
  
  theme: 'night', // 'morning', 'afternoon', 'night'
  setTheme: (theme) => set({ theme }),

  isCursorHovering: false,
  setCursorHovering: (status) => set({ isCursorHovering: status }),
}));
