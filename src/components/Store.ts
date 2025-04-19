import { create } from 'zustand';

const useMemoryStore = create((set) => ({
  capturedMemory: null,
  setCapturedMemory: (memory) => set({ capturedMemory: memory }),
  clearCapturedMemory: () => set({ capturedMemory: null }),
}));

export default useMemoryStore;