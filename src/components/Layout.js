import Navbar from "./Navbar";
/* import footer */

export default function Layout({ children }) {
  return (
    <div>
      <Navbar />
      {children}
      {/* footer */}
    </div>
  );
}