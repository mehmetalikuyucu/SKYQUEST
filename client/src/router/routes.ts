import React, { ComponentType } from "react";
import Home from "../pages/Home";
import Login from "../pages/Login";
import Dashboard from "../pages/dashboard/Dashboard";
import Profile from "../pages/Profile";

export interface RouteType {
  path: string;
  component: React.FC | ComponentType<any>;
  layout: "main" | "auth" | null;
  protected: boolean;
}

const routes: RouteType[] = [
  { path: "/", component: Home, layout: "main", protected: false },
  { path: "/login", component: Login, layout: "auth", protected: false },
  { path: "/dashboard", component: Dashboard, layout: "main", protected: true },
  { path: "/profile", component: Profile, layout: "main", protected: true },
];

export default routes;
