import { MDXRemote, MDXRemoteProps } from "next-mdx-remote/rsc";
import Image from "next/image";
import Link from "next/link";
import React, { ReactNode } from "react";
import { uniqueSlug } from "@/lib/slugify";

function textOf(node: ReactNode): string {
  if (typeof node === "string" || typeof node === "number") return String(node);
  if (Array.isArray(node)) return node.map(textOf).join("");
  if (React.isValidElement(node)) {
    return textOf((node.props as { children?: ReactNode }).children);
  }
  return "";
}

type AnchorProps = React.AnchorHTMLAttributes<HTMLAnchorElement>;

function CustomLink({ href = "", children, ...props }: AnchorProps) {
  if (href.startsWith("/")) {
    return (
      <Link href={href} {...props}>
        {children}
      </Link>
    );
  }
  if (href.startsWith("#")) {
    return (
      <a href={href} {...props}>
        {children}
      </a>
    );
  }
  return (
    <a href={href} target="_blank" rel="noopener noreferrer" {...props}>
      {children}
    </a>
  );
}

function createImage({ alt, src }: React.ImgHTMLAttributes<HTMLImageElement>) {
  if (!src || typeof src !== "string") return null;
  return (
    <span className="prose-img">
      <Image
        src={src}
        alt={alt ?? ""}
        fill
        sizes="(max-width: 960px) 100vw, 720px"
      />
    </span>
  );
}

function createHeading(
  as: "h1" | "h2" | "h3" | "h4" | "h5" | "h6",
  seen: Map<string, number>,
) {
  const Tag = as;
  const CustomHeading = ({ children }: { children?: ReactNode }) => {
    const slug = uniqueSlug(textOf(children), seen);
    return (
      <Tag id={slug}>
        {children}
        <a className="anchor" href={`#${slug}`} aria-label="Link to this section">
          #
        </a>
      </Tag>
    );
  };
  CustomHeading.displayName = as;
  return CustomHeading;
}

function Pre({ children }: { children?: ReactNode }) {
  return <pre tabIndex={0}>{children}</pre>;
}

function createComponents() {
  const seen = new Map<string, number>();
  return {
    h1: createHeading("h1", seen),
    h2: createHeading("h2", seen),
    h3: createHeading("h3", seen),
    h4: createHeading("h4", seen),
    h5: createHeading("h5", seen),
    h6: createHeading("h6", seen),
    img: createImage,
    a: CustomLink,
    pre: Pre,
  };
}

type CustomMDXProps = MDXRemoteProps & {
  components?: MDXRemoteProps["components"];
};

export function CustomMDX(props: CustomMDXProps) {
  return (
    <MDXRemote
      {...props}
      components={{ ...createComponents(), ...(props.components || {}) }}
    />
  );
}
