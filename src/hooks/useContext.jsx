import { useContext } from "react";
import OrgContext from "../context/OrgContext";

const useOrgContext = () => {
  return useContext(OrgContext);
};

export default useOrgContext;
