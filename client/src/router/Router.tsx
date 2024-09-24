import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import routes, { RouteType } from "./routes";
import MainLayout from "../layouts/MainLayout";
import AuthLayout from "../layouts/AuthLayout";
import ProtectedRoute from "./components/ProtectedRoute";
import NotFound from "./components/NotFound";
const Router: React.FC = () => {
  return (
    <BrowserRouter>
      <Routes>
        {routes.map((route) => (
          <Route
            key={route.path}
            path={route.path}
            element={
              route.protected ? (
                <ProtectedRoute>{renderRouteWithLayout(route)}</ProtectedRoute>
              ) : (
                renderRouteWithLayout(route)
              )
            }
          />
        ))}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
};

const renderRouteWithLayout = (route: RouteType) => {
  const Component = route.component;
  if (route.layout === "main") {
    return (
      <MainLayout>
        <Component />
      </MainLayout>
    );
  } else if (route.layout === "auth") {
    return (
      <AuthLayout>
        <Component />
      </AuthLayout>
    );
  } else {
    return <Component />;
  }
};

export default Router;
