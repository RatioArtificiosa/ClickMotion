import { BrowserRouter, Route, Routes } from "react-router-dom";
import { SmoothScroll } from "./components/SmoothScroll";
import { DesignInMotionLab } from "./pages/DesignInMotionLab";

/**
 * Standalone lab shell — SmoothScroll + DesignInMotionLab only.
 * No Preloader, Nav, Home, or SoundProvider.
 */
export default function App() {
  return (
    <BrowserRouter>
      <SmoothScroll>
        <Routes>
          <Route path="/" element={<DesignInMotionLab />} />
          <Route path="/lab/design-in-motion" element={<DesignInMotionLab />} />
        </Routes>
      </SmoothScroll>
    </BrowserRouter>
  );
}
