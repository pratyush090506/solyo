import { create } from 'zustand';
import { FieldValue } from 'firebase/firestore';

interface Memory {
  imageURL: string | null;
  note: string;
  audioURL: string | null;
  location: {
    lat: number;
    lon: number;
  } | null;
  timestamp: FieldValue | string; // <-- allow both
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
