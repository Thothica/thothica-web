import React from "react";

function layout({ children }: { children: React.ReactNode }) {
  return (
    <div>
      component testing
      {children}
    </div>
  );
}

export default layout;
