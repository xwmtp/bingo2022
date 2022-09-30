import React from "react";

export const WideScreenOnly: React.FC<{
  className?: string;
}> = ({ className, children }) => {
  return <span className={className + " wideScreenOnly"}>{children}</span>;
};
