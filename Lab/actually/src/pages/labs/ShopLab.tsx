import { Navigate } from "react-router-dom";

/**
 * Legacy /lab/shop → split into stockists + products.
 * Prefer /lab/stockists and /lab/products.
 */
export function ShopLab() {
  return <Navigate to="/lab/stockists" replace />;
}
