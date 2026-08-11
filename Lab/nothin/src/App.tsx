import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import { SmoothScroll } from "./components/SmoothScroll";
import { Hub } from "./pages/Hub";
import { PhobicObjectsLab } from "./pages/labs/PhobicObjectsLab";
import { StudioSequenceLab } from "./pages/labs/StudioSequenceLab";

/**
 * NOTHIN' ← noth.in
 * Two section labs only. Lab port 3032 (source clone 3030).
 */
export default function App() {
  return (
    <BrowserRouter>
      <SmoothScroll>
        <Routes>
          <Route path="/" element={<Hub />} />
          <Route path="/lab/phobic-objects" element={<PhobicObjectsLab />} />
          <Route path="/lab/studio-sequence" element={<StudioSequenceLab />} />
          <Route
            path="/lab"
            element={<Navigate to="/lab/phobic-objects" replace />}
          />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </SmoothScroll>
    </BrowserRouter>
  );
}
