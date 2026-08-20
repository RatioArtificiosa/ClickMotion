import { LabChrome } from "../../components/LabChrome";
import { FilmMotion } from "../../sections/FilmMotion";

export function FilmLab() {
  return (
    <>
      <LabChrome label="Film" />
      <div className="lab-runway">Runway — scroll into film</div>
      <FilmMotion coupleWithFooter={false} />
      <div className="lab-runway lab-runway--dark">After spacer (pin end)</div>
    </>
  );
}
