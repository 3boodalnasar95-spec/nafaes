import React from 'react';

interface ExternalLinkProps extends React.AnchorHTMLAttributes<HTMLAnchorElement> {
  children: React.ReactNode;
  href: string;
  className?: string;
}

export default function ExternalLink({ 
  children, 
  href, 
  className, 
  ...props 
}: ExternalLinkProps) {
  // Check if the link is external (starts with http, https, or wa.me)
  const isExternal = href && (
    href.startsWith('http://') || 
    href.startsWith('https://') ||
    href.startsWith('mailto:') ||
    href.startsWith('wa.me')
  );

  // Only add rel if it's an external link
  const rel = isExternal ? 'noopener noreferrer' : undefined;

  return (
    <a 
      href={href} 
      target={isExternal ? '_blank' : undefined}
      rel={rel}
      className={className}
      {...props}
    >
      {children}
    </a>
  );
}