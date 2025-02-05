import "./Profiles.css";
import Profile from "./Profile/Profile";
export default function Profiles() {
  return (
    <div className="profiles">
      <Profile initial={"A"} />
      <Profile initial={"B"} />
      <Profile initial={"C"} />
      <Profile initial={"D"} />
      <Profile initial={"E"} />
      <Profile initial={"F"} />
      <Profile initial={"G"} />
      <Profile initial={"H"} />
    </div>
  );
}
