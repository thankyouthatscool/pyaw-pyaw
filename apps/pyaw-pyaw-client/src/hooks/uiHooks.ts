import { useCallback } from "react";

import { useAppDispatch, useAppSelector } from ".";
import { closeSidebar, openSidebar } from "../store/features";

export const useUiHooks = () => {
  const dispatch = useAppDispatch();

  const { isSidebarOpen } = useAppSelector(({ ui }) => ui);

  const handleSidebarToggle = useCallback(() => {
    if (isSidebarOpen) {
      return dispatch(closeSidebar());
    }

    if (!isSidebarOpen) {
      return dispatch(openSidebar());
    }
  }, [dispatch, isSidebarOpen]);

  return {
    isSidebarOpen,
    handleSidebarToggle,
  };
};
