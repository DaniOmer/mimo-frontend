import { PiniaPluginContext } from "pinia";
import { persistanceConfig } from "../config";

export const persistState = ({ store }: PiniaPluginContext) => {
  const shouldPersist = persistanceConfig[store.$id] || false;
  if (!shouldPersist) return;
  const savedState = localStorage.getItem(store.$id);
  if (savedState) {
    store.$patch(JSON.parse(savedState));
  }

  store.$subscribe((_, state) => {
    localStorage.setItem(store.$id, JSON.stringify(state));
  });

  if (savedState) {
    store.$patch((_) => ({
      ...JSON.parse(savedState),
    }));
  }
};
