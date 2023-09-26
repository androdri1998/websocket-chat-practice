import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import { Suspense, lazy } from "react";
import { Loading } from "./components/Loading";

const ChatPage = lazy(() => import("../app/pages/ChatPage"));
const HomePage = lazy(() => import("../app/pages/HomePage"));

const RoutesApp = () => {
  return (
    <Suspense fallback={<Loading />}>
      <BrowserRouter>
        <Routes>
          <Route path="/" Component={HomePage} />
          <Route path="/chat" Component={ChatPage} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </BrowserRouter>
    </Suspense>
  );
};

export default RoutesApp;
