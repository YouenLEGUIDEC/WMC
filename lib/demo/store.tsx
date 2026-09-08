"use client";
import {
  createContext,
  useContext,
  useSyncExternalStore,
  type ReactNode,
} from "react";
import { defaultProfile, type DemoProfile } from "./data";
import { z } from "zod";
const schema = z.object({
  profile: z.object({
    name: z.string().min(1).max(40),
    town: z.string(),
    discipline: z.enum(["Route", "Gravel", "VTT"]),
    pace: z.number().min(10).max(45),
    distance: z.number().min(10).max(250),
    day: z.string(),
    social: z.string(),
    style: z.string(),
    visibility: z.string(),
  }),
  joined: z.array(z.string()),
  saved: z.array(z.string()),
  onboarded: z.boolean(),
});
type State = z.infer<typeof schema>;
const initial: State = {
  profile: defaultProfile,
  joined: [],
  saved: [],
  onboarded: false,
};
const serverSnapshot = { state: initial, ready: false, storageError: false };
let snapshot = serverSnapshot;
const listeners = new Set<() => void>();
function notify() {
  listeners.forEach((listener) => listener());
}
function subscribe(listener: () => void) {
  listeners.add(listener);
  if (!snapshot.ready) {
    let state = initial;
    let storageError = false;
    try {
      const raw = localStorage.getItem("wmc-demo-v1");
      if (raw) {
        const result = schema.safeParse(JSON.parse(raw));
        if (result.success) state = result.data;
      }
    } catch {
      storageError = true;
    }
    snapshot = { state, ready: true, storageError };
    notify();
  }
  return () => {
    listeners.delete(listener);
  };
}
function update(state: State) {
  let storageError = false;
  try {
    localStorage.setItem("wmc-demo-v1", JSON.stringify(state));
  } catch {
    storageError = true;
  }
  snapshot = { state, ready: true, storageError };
  notify();
}
const Context = createContext<{
  state: State;
  ready: boolean;
  storageError: boolean;
  saveProfile: (p: DemoProfile) => void;
  toggleRide: (id: string) => void;
  toggleSave: (id: string) => void;
  reset: () => void;
} | null>(null);
export function DemoProvider({ children }: { children: ReactNode }) {
  const view = useSyncExternalStore(
    subscribe,
    () => snapshot,
    () => serverSnapshot,
  );
  return (
    <Context.Provider
      value={{
        ...view,
        saveProfile: (p) =>
          update({ ...snapshot.state, profile: p, onboarded: true }),
        toggleRide: (id) => {
          const s = snapshot.state;
          update({
            ...s,
            joined: s.joined.includes(id)
              ? s.joined.filter((x) => x !== id)
              : [...s.joined, id],
          });
        },
        toggleSave: (id) => {
          const s = snapshot.state;
          update({
            ...s,
            saved: s.saved.includes(id)
              ? s.saved.filter((x) => x !== id)
              : [...s.saved, id],
          });
        },
        reset: () => update(initial),
      }}
    >
      {children}
    </Context.Provider>
  );
}
export function useDemo() {
  const context = useContext(Context);
  if (!context) throw new Error("DemoProvider absent");
  return context;
}
