import "./Navbar.css";
import PersistentDrawerRight from "./Rightbar";

function Navbar({ changepage, session }) {
  return (
    <>
      <PersistentDrawerRight className="navy" changePage={changepage} session={session} />
    </>
  );
}
export default Navbar;
