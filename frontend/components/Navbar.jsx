import "./Navbar.css";
import PersistentDrawerRight from "./Rightbar";
function Navbar({ changepage }) {
  return (
    <>
      <PersistentDrawerRight className="navy" changePage={changepage} />
    </>
  );
}
export default Navbar;
