"use client";

import Link from "next/link";
import { MouseEventHandler } from "react";
import { useFormStatus } from "react-dom";

export const Button = ({
  type,
  size = "default",
  target,
  label,
  icon = "right",
  disabled = false,
  children,
}: {
  type: "primary" | "secondary" | "sidebar" | "card" | "submit";
  size?: "default" | "small";
  target?: string | Function;
  label?: string;
  icon?: "left" | "right";
  disabled?: boolean;
  children?: string;
}) => {
  const { pending } = useFormStatus();

  return (
    <div className="mt-4">
      {type === "submit" ? (
        <button
          type="submit"
          disabled={pending || disabled}
          className="inline-block bg-black py-3 pl-8 pr-3 text-sm font-bold text-white no-underline hover:text-white disabled:bg-slate-300 md:pl-8 md:pr-8 md:text-base"
        >
          {label}
          <span className="font-icon before:pr-4 after:relative after:top-0.5 after:inline-block after:leading-none after:content-['A']"></span>
        </button>
      ) : (
        <Link
          href={type !== "sidebar" && typeof target === "string" ? target : ""}
          scroll={type === "sidebar" ? false : true}
          onClick={
            type === "sidebar" && typeof target === "function"
              ? (target as MouseEventHandler)
              : undefined
          }
          className={`${["secondary", "sidebar", "card"].includes(type) ? "bg-slate-300" : "bg-black text-white hover:text-white md:pl-8"} inline-block ${size === "small" ? "py-2" : "py-3"} ${!["card", "sidebar"].includes(type) && icon !== "left" ? "pl-8" : undefined} pr-3 text-sm font-bold no-underline md:pr-8 md:text-base`}
          target={
            target && typeof target === "string" && target.startsWith("http")
              ? "_blank"
              : "_self"
          }
          rel="noopener noreferrer"
        >
          {icon === "left" ? (
            <span className="pl-8 font-icon before:relative before:top-0.5 before:inline-block before:rotate-180 before:leading-none before:content-['A'] after:pr-4"></span>
          ) : null}

          {children ? children : <span>{label}</span>}

          {icon === "right" ? (
            <span className="font-icon before:pr-4 after:relative after:top-0.5 after:inline-block after:leading-none after:content-['A']"></span>
          ) : null}
        </Link>
      )}
    </div>
  );
};
