import { BrowserRouter, Routes, Route } from "react-router-dom";
import { SmoothScroll } from "./components/SmoothScroll";
import { Hub } from "./pages/Hub";
import { FilmLab } from "./pages/labs/FilmLab";
import { FooterLab } from "./pages/labs/FooterLab";
import { FilmFooterLab } from "./pages/labs/FilmFooterLab";

export default function App() {
  return (
    <BrowserRouter>
      <SmoothScroll>
        <Routes>
          <Route path="/" element={<Hub />} />
          <Route path="/lab/film" element={<FilmLab />} />
          <Route path="/lab/footer" element={<FooterLab />} />
          <Route path="/lab/film-footer" element={<FilmFooterLab />} />
        </Routes>
      </SmoothScroll>
    </BrowserRouter>
  );
}
