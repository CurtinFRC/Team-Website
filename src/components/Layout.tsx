import Navbar from "./Navbar.tsx";
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