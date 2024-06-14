import Link from "next/link";
import "./Navbar.module.css";

const Navbar = () => {
  return (
    <nav className="navbar">
      <div className="logo">
        <Link href="/">MyApp</Link>
      </div>
      <ul className="navLinks">
        <li>
          <Link href="/">Home</Link>
        </li>
        <li>
          <Link href="/about">About</Link>
        </li>
        <li>
          <Link href="/contact">Contact</Link>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
