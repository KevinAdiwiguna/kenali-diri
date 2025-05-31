import Image from "next/image";
import Link from "next/link";

export const Logo = () => {
	return (
		<Link href="/" className="PX-2 md:px-8 flex items-center space-x-2 bg-base-100 cursor-pointer py-2 ">
			<Image src="/ruang-aman-no-bg.png" alt="Logo" width={500} height={500} className="h-10 w-auto" />
			<span className="text-2xl font-bold text-neutral">RuangAman</span>
		</Link>
	);
};
