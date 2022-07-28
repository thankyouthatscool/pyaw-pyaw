import { useCallback } from "react";

export const useLocalStorageHooks = () => {
  const handleGetUsername = useCallback(() => {
    const username = localStorage.getItem("username");

    if (username) {
      handleSetUsername(username);
    }

    return username;
  }, []);

  const handleRemoveUsername = () => {
    localStorage.removeItem("username");
  };

  const handleSetUsername = (username: string) => {
    localStorage.setItem("username", username);
  };

  return { handleGetUsername, handleRemoveUsername, handleSetUsername };
};
