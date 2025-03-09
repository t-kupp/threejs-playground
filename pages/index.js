import Link from "next/link";

const links = [
  { title: "Dot Plane", href: "/lab/DotPlane" },
  { title: "Moving Light", href: "/lab/MovingLight" },
];

export default function Home() {
  return (
    <div className="bg-light text-dark flex h-screen w-screen flex-col p-12 text-center uppercase">
      <h1 className="text-2xl font-bold">Three.js Experiements</h1>
      <div className="mx-auto flex w-full max-w-xl flex-col gap-4 p-8">
        {links.map((link, index) => (
          <Link
            className="hover:bg-dark hover:text-light block w-full border border-[#525252] px-2 py-1"
            key={index}
            href={link.href}
          >
            {link.title}
          </Link>
        ))}
      </div>
    </div>
  );
}
