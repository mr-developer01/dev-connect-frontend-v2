import { useAppDispatch, useAppSelector } from "../../../store/hooks";
import { selectAnchor, setAnchor } from "../../../store/slices/toggleSlice";

type Anchor = "right";

export const useToggleDrawer = () => {
  const dispatch = useAppDispatch();
  const state = useAppSelector(selectAnchor);

  return {
    dispatchAction: (anchor: Anchor, open: boolean) =>
      dispatch(setAnchor({ ...state, [anchor]: open })),
  };
};
