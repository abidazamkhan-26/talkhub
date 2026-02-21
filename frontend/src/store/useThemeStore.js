import { create } from "zustand";

export const useThemeStore = create((set) => ({
  theme: localStorage.getItem("talkhub-theme") || "coffee",
  setTheme: (theme) => {
    localStorage.setItem("talkhub-theme", theme);
    set({ theme });
  },
}));
