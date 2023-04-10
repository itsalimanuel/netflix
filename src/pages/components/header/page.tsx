import logo from "@/assets/logo.svg";
import Image from "next/image";
import Link from "next/link";
export default function Header() {
  return (
    <header className="relative p-8 w-full">
      <Link href='/'>
        <Image src={logo} width={100} height={50} alt="" />
      </Link>
    </header>
  );
}
