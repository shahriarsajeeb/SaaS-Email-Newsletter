import { useAtom } from "jotai";
import { sideBarActiveItem } from "@/app/configs/constants";

const useRouteChange = () => {
  const [activeRoute, setActiveRoute] = useAtom(sideBarActiveItem);
  return { activeRoute, setActiveRoute };
};

export default useRouteChange;
