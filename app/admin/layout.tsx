// import "./.modules.css";
// type Props = { children: React.ReactNode };
// export default function layout({ children }: Props) {
//   return (
//     <div className="admin-container">
//       <header></header>
//       <main>{children}</main>
//       <footer></footer>
//     </div>
//   );
// }

// components/AdminLayout.js
import Link from "next/link";
import "./.modules.css";

type Props = { children: React.ReactNode };

export default function AdminLayout({ children }: Props) {
  return (
    <div className="adminContainer">
      <header className="header">
        <nav className="nav">
          <ul className="navList">
            <li className="navItem">
              <Link href="/admin/dashboard">Dashboard</Link>
            </li>
            <li className="navItem">
              <Link href="/admin/add">Add New Entry</Link>
            </li>
            <li className="navItem">
              <Link href="/admin/settings">Settings</Link>
            </li>
          </ul>
        </nav>
      </header>
      <main className="main">{children}</main>
      <footer className="footer">© 2024 My Travel Log</footer>
    </div>
  );
}
