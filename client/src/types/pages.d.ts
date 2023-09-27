import React from "react";

declare module Pages {
  export interface Routes {
    path: string;
    Component: React.ReactNode;
  }
}
