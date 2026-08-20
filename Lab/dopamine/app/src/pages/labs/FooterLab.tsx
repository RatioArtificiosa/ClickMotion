import { LabChrome } from "../../components/LabChrome";
import { SiteFooter } from "../../sections/SiteFooter";

export function FooterLab() {
  return (
    <>
      <LabChrome label="Footer" />
      <div className="lab-runway">Runway — scroll into footer</div>
      <div style={{ minHeight: "40vh", background: "#fff9f7" }} />
      <SiteFooter />
    </>
  );
}
