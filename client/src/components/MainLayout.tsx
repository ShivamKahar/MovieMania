import React from "react";

function MainLayout({ children }: { children: React.ReactElement }) {
  return <div className="max-w-screen-xl mx-auto min-h-screen">{children}</div>;
}

export default MainLayout;
