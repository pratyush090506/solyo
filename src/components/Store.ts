import { create } from 'zustand';

interface Memory {
  imageURL: string | null;
  note: string;
  audioURL: string | null;
  location: {
    lat: number;
    lon: number;
  } | null;
}

interface MemoryStore {
  capturedMemory: Memory | null;
  setCapturedMemory: (memory: Memory) => void;
  clearCapturedMemory: () => void;
}

const useMemoryStore = create<MemoryStore>((set) => ({
  capturedMemory: null,
  setCapturedMemory: (memory) => set({ capturedMemory: memory }),
  clearCapturedMemory: () => set({ capturedMemory: null }),
}));

export default useMemoryStore;
