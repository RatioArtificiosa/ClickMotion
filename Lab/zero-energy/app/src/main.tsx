import { createRoot } from "react-dom/client";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import { Hub } from "./pages/Hub";
import { CanGalleryLab } from "./pages/CanGalleryLab";
import "./index.css";

createRoot(document.getElementById("root")!).render(
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<Hub />} />
      <Route path="/lab/can-gallery" element={<CanGalleryLab />} />
      <Route path="/home" element={<Navigate to="/lab/can-gallery" replace />} />
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  </BrowserRouter>,
);
