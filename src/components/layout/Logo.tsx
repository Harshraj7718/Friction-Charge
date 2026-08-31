import Image from "next/image";
import Link from "next/link";
import { cn } from "@/lib/utils/cn";

type LogoProps = {
  variant?: "icon" | "full";
  className?: string;
  imgClassName?: string;
  priority?: boolean;
};

export default function Logo({ variant = "icon", className, imgClassName, priority = false }: LogoProps) {
  const isIcon = variant === "icon";

  return (
    <Link href="/" aria-label="Friction Charge — home" className={cn("inline-flex items-center", className)}>
      <Image
        src={isIcon ? "/images/logo-icon.png" : "/images/logo.png"}
        alt="Friction Charge"
        width={isIcon ? 908 : 1672}
        height={isIcon ? 589 : 940}
        priority={priority}
        className={cn(isIcon ? "h-9 w-auto" : "h-24 w-auto", imgClassName)}
      />
    </Link>
  );
}
