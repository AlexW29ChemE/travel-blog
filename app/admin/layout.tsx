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
import { SignIn } from "../components/SignIn";
import { auth } from "../../auth";

type Props = { children: React.ReactNode };



export default async function AdminLayout({ children }: Props) {
  
  const session  = await auth()
  if(session?.user?.email !== process.env.ADMIN_EMAIL){
    return <div><p className="m-8">Your not authorised to view this page! Unless of course you are the Alex and your the owner of the website.</p><div className="m-3"><SignIn/></div></div>
  }
  
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
            <li className="navItem">
              <SignIn/>
            </li>
          </ul>
        </nav>
      </header>
      <main className="main">{children}</main>
      <footer className="footer">© 2024 My Travel Log</footer>
    </div>
  );
}
