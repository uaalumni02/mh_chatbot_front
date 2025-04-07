import { useLocation } from "react-router-dom";

const useUserIdFromPath = () => {
  const location = useLocation();
  return location.pathname.split("/").pop();
};

export default useUserIdFromPath;
