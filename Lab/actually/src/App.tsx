import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import { SmoothScroll } from "./components/SmoothScroll";
import { Home } from "./pages/Home";
import { HeroLab } from "./pages/labs/HeroLab";
import { FlavorsLab } from "./pages/labs/FlavorsLab";
import { InsideLab } from "./pages/labs/InsideLab";
import { StoryLab } from "./pages/labs/StoryLab";
import { PressLab } from "./pages/labs/PressLab";
import { ShopLab } from "./pages/labs/ShopLab";
import { StockistsLab } from "./pages/labs/StockistsLab";
import { ProductsLab } from "./pages/labs/ProductsLab";

/**
 * ACTUALLY ← drinkstill.nz clone
 * Motion stack: GSAP + Lenis + R3F/Three (no Framer Motion).
 *
 * Routes:
 *   /                 full single-page assemble
 *   /lab/hero         01
 *   /lab/flavors      02
 *   /lab/inside       03
 *   /lab/story        04
 *   /lab/press        05
 *   /lab/stockists    06a Where available
 *   /lab/products     06b Price boxes
 *   /lab/shop         → redirect stockists (legacy)
 *
 * Labs share production section components — never fork for labs.
 * Dev port: 3010
 */
export default function App() {
  return (
    <BrowserRouter>
      <SmoothScroll>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/lab/hero" element={<HeroLab />} />
          <Route path="/lab/flavors" element={<FlavorsLab />} />
          <Route path="/lab/inside" element={<InsideLab />} />
          <Route path="/lab/story" element={<StoryLab />} />
          <Route path="/lab/press" element={<PressLab />} />
          <Route path="/lab/stockists" element={<StockistsLab />} />
          <Route path="/lab/products" element={<ProductsLab />} />
          <Route path="/lab/shop" element={<ShopLab />} />
          <Route path="/lab" element={<Navigate to="/lab/hero" replace />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </SmoothScroll>
    </BrowserRouter>
  );
}
