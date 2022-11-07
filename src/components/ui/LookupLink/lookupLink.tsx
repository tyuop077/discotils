import Link from "next/link";
import {useRouter} from "next/router";

interface Props {
  children: React.ReactNode;
  activeClass: string;
  href: string;
}

const LookupLink = ({children, activeClass, href}: Props) => {
  const router = useRouter();
  return (
    <Link href={`/lookup${href}`} className={router.pathname === `/lookup${href}` ? activeClass : undefined} scroll={false}>
      {children}
    </Link>
  )
}

export default LookupLink
