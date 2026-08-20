import { Link } from "react-router-dom";
import { CanGallery } from "../sections/can-gallery/CanGallery";

/**
 * Isolated sandbox for the 3D can gallery.
 * Shares the real section module with future Home — do not fork.
 */
export function CanGalleryLab() {
  return (
    <>
      <div className="ze-lab-badge">
        <Link to="/">Lab · Hub</Link>
      </div>
      <CanGallery />
    </>
  );
}
