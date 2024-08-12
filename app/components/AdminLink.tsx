import Link, { LinkProps } from "next/link";
import { auth } from "../../auth";
import { isAuthorised } from "../constants";
import classNames from "classnames";

type Props = { children: React.ReactNode, href:string, className?:string };

export default async function AdminLink({href, children, className}: Props){
    const session  = await auth()
    if(!isAuthorised(session?.user?.email)) return null
    return <Link href="/admin" className={className}>{children}</Link>
}