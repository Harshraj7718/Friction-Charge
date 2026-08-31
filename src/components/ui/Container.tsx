import { createElement, type ComponentPropsWithoutRef, type ElementType, type ReactNode } from "react";
import { cn } from "@/lib/utils/cn";

type ContainerProps<T extends ElementType> = {
  as?: T;
  children: ReactNode;
  className?: string;
} & Omit<ComponentPropsWithoutRef<T>, "as" | "children" | "className">;

export default function Container<T extends ElementType = "div">({ children, className, as, ...props }: ContainerProps<T>) {
  return createElement(as || "div", { className: cn("container-fc", className), ...props }, children);
}
