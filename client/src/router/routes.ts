import React, { ComponentType } from "react";
import Home from "../pages/Home";
import Dashboard from "../pages/dashboard/Flights";
import Profile from "../pages/Profile";
import AuthContainer from "../pages/auth/Auth";
import Reservation from "../pages/reservations/Reservation";

export interface RouteType {
  path: string;
  component: React.FC | ComponentType<any>;
  layout: "main" | "auth" | null;
  protected: boolean;
}

const routes: RouteType[] = [
  { path: "/auth", component: AuthContainer, layout: "auth", protected: false },
  { path: "/", component: Dashboard, layout: "main", protected: false },
  {
    path: "/my-flights",
    component: Reservation,
    layout: "main",
    protected: true,
  },
];

export default routes;
