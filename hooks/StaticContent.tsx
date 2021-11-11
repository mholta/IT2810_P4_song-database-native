import React from "react";
import { useStaticContent } from "./useStaticContent";

interface StaticContentProvicerProps {
  children: React.ReactNode;
}

const StaticContentProvider = ({ children }: StaticContentProvicerProps) => {
  // Hook for fetching categories and adding to redux. Only on initial page load
  useStaticContent();
  return <>{children}</>;
};

export default StaticContentProvider;
