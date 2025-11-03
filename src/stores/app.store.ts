import { create } from "zustand";
import type { AppId } from "../constant/registered_apps";

type AppState = {
  start_menu: boolean;
  toggleStartMenu: () => void;
  setStartMenu: (state: boolean) => void;
  opened: AppId[];
  setOpened: (appid: AppId) => void;
  in_background: AppId[];
  setToBackground: (appid: AppId) => void;
  toggleOpen: (appid: AppId) => void;
  kill: (appid: AppId) => void;
  getRunning: () => AppId[];
  getCurrentAppState: (appid: AppId) => "opened" | "in_background";
};

// NOTE: persist app store for hot reload
// const useAppStore = create<AppState>()(
//   persist(
//     (set, get) => ({
//       start_menu: false,
//       toggleStartMenu: () =>
//         set((state) => ({ start_menu: !state.start_menu })),
//       setStartMenu: (val) => set({ start_menu: val }),
//       opened: [],
//       setOpened: (appid) =>
//         set((state) => {
//           // return if already opened
//           if (state.opened.includes(appid)) return {};
//
//           // create new in_background app array without this.app
//           const bgApp = state.in_background.filter((a) => appid !== a);
//           return {
//             opened: [...state.opened, appid],
//             in_background: bgApp,
//           };
//         }),
//       in_background: [],
//       setToBackground: (appid) =>
//         set((state) => {
//           // create new opened app array without this.app
//           const openedApp = state.opened.filter((a) => appid !== a);
//           return {
//             in_background: [...state.in_background, appid],
//             opened: openedApp,
//           };
//         }),
//       toggleOpen: (app) => {
//         const isAppOpened = get().opened.includes(app);
//         if (isAppOpened) {
//           get().setToBackground(app);
//         } else {
//           get().setOpened(app);
//         }
//       },
//       kill: (app) =>
//         set((state) => {
//           // create new array without this.app
//           const filteredOpenedApp = state.opened.filter((a) => app !== a);
//           const filteredBackgroundApp = state.in_background.filter(
//             (a) => app !== a,
//           );
//
//           return {
//             opened: filteredOpenedApp,
//             in_background: filteredBackgroundApp,
//           };
//         }),
//       getRunning: () => {
//         const { opened, in_background } = get();
//         return [...opened, ...in_background];
//       },
//       getCurrentAppState: (app) =>
//         get().opened.includes(app) ? "opened" : "in_background",
//     }),
//     {
//       name: "app-store-persist",
//     },
//   ),
// );

const useAppStore = create<AppState>()((set, get) => ({
  start_menu: false,
  toggleStartMenu: () => set((state) => ({ start_menu: !state.start_menu })),
  setStartMenu: (val) => set({ start_menu: val }),
  opened: ["about"],
  setOpened: (appid) =>
    set((state) => {
      // return if already opened
      if (state.opened.includes(appid)) return {};

      // create new in_background app array without this.app
      const bgApp = state.in_background.filter((a) => appid !== a);
      return {
        opened: [...state.opened, appid],
        in_background: bgApp,
      };
    }),
  in_background: [],
  setToBackground: (appid) =>
    set((state) => {
      // create new opened app array without this.app
      const openedApp = state.opened.filter((a) => appid !== a);
      return {
        in_background: [...state.in_background, appid],
        opened: openedApp,
      };
    }),
  toggleOpen: (app) => {
    const isAppOpened = get().opened.includes(app);
    if (isAppOpened) {
      get().setToBackground(app);
    } else {
      get().setOpened(app);
    }
  },
  kill: (app) =>
    set((state) => {
      // create new array without this.app
      const filteredOpenedApp = state.opened.filter((a) => app !== a);
      const filteredBackgroundApp = state.in_background.filter(
        (a) => app !== a,
      );

      return {
        opened: filteredOpenedApp,
        in_background: filteredBackgroundApp,
      };
    }),
  getRunning: () => {
    const { opened, in_background } = get();
    return [...opened, ...in_background];
  },
  getCurrentAppState: (app) =>
    get().opened.includes(app) ? "opened" : "in_background",
}));

export default useAppStore;
