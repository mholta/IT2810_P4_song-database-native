import React from "react";
import { useStaticContent } from "./useStaticContent";

const StaticContent = () => {
  // Hook for fetching categories and adding to redux. Only on initial page load
  useStaticContent();
  return <></>;
};

export default StaticContent;
