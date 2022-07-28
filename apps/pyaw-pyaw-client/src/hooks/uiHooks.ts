import { useCallback } from "react";

import { useAppDispatch, useAppSelector } from ".";
import {
  closeSidebar,
  closeUserSelectModal,
  openSidebar,
  openUserSelectModal,
} from "../store/features";

export const useUiHooks = () => {
  const dispatch = useAppDispatch();

  const { isSidebarOpen, isUserSelectionModalOpen } = useAppSelector(
    ({ ui }) => ui
  );

  const handleSidebarToggle = useCallback(() => {
    if (isSidebarOpen) {
      return dispatch(closeSidebar());
    }

    if (!isSidebarOpen) {
      return dispatch(openSidebar());
    }
  }, [dispatch, isSidebarOpen]);

  const handleUserSelectionModalToggle = useCallback(() => {
    if (isUserSelectionModalOpen) {
      return dispatch(closeUserSelectModal());
    }

    if (!isUserSelectionModalOpen) {
      return dispatch(openUserSelectModal());
    }
  }, [dispatch, isUserSelectionModalOpen]);

  return {
    isSidebarOpen,
    isUserSelectionModalOpen,
    handleSidebarToggle,
    handleUserSelectionModalToggle,
  };
};
