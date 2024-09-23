import { useSyncExternalStore } from "react";

const getAuthToken = () => localStorage.getItem("authToken");

const setAuthToken = (token: string | null) => {
  if (token) {
    localStorage.setItem("authToken", token);
  } else {
    localStorage.removeItem("authToken");
  }
  emitChange();
};

let listeners: (() => void)[] = [];

const emitChange = () => {
  listeners.forEach((listener) => listener());
};

const useAuthStore = () => {
  const token = useSyncExternalStore(
    (onStoreChange) => {
      listeners.push(onStoreChange);
      return () => {
        listeners = listeners.filter((listener) => listener !== onStoreChange);
      };
    },
    getAuthToken
  );

  return {
    token,
    isAuthenticated: !!token,
    login: (newToken: string) => setAuthToken(newToken),
    logout: () => setAuthToken(null),
  };
};

export default useAuthStore;
