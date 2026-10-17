import { MDXRemote, MDXRemoteProps } from "next-mdx-remote/rsc";
import Image from "next/image";
import Link from "next/link";
import React, { ReactNode } from "react";
import { slugify } from "@/lib/slugify";

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

function createHeading(as: "h1" | "h2" | "h3" | "h4" | "h5" | "h6") {
  const Tag = as;
  const CustomHeading = ({ children }: { children?: ReactNode }) => {
    const slug = slugify(textOf(children));
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

const components = {
  h1: createHeading("h1"),
  h2: createHeading("h2"),
  h3: createHeading("h3"),
  h4: createHeading("h4"),
  h5: createHeading("h5"),
  h6: createHeading("h6"),
  img: createImage,
  a: CustomLink,
  pre: Pre,
};

type CustomMDXProps = MDXRemoteProps & {
  components?: MDXRemoteProps["components"];
};

export function CustomMDX(props: CustomMDXProps) {
  return (
    <MDXRemote
      {...props}
      components={{ ...components, ...(props.components || {}) }}
    />
  );
}
