import Link from "next/link";
import {useRouter} from "next/router";
import {ReactNode} from "react";

interface InitializerProps {
  activeClass: string;
  id: string;
}

interface Props {
  children: ReactNode;
  href: string;
}

const createLookupLink = ({activeClass, id}: InitializerProps) => {
  const LookupLink = ({children, href}: Props) => {
    const router = useRouter();
    return (
      <Link
        href={`/lookup${href}?id=${id}`}
        className={router.pathname === `/lookup${href}` ? activeClass : undefined}
        scroll={false}
        as={`/lookup${href}`}
      >
        {children}
      </Link>
    )
  }
  return {LookupLink};
}

export default createLookupLink
