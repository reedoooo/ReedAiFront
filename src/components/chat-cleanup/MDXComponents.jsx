// MDXComponents.js
import mermaid from 'mermaid';
import React, { useEffect, useRef } from 'react';

const MDXComponents = {
  p: ({ children }) => (
    <p style={{ fontSize: '18px', marginBottom: '1.2rem' }}>{children}</p>
  ),
  h1: ({ children }) => (
    <h1 style={{ marginBottom: '1rem', fontSize: '40px' }}>{children}</h1>
  ),
  h2: ({ children }) => <h2 style={{ marginBottom: '1rem' }}>{children}</h2>,
  h3: ({ children }) => <h3 style={{ marginBottom: '1rem' }}>{children}</h3>,
  h4: ({ children }) => <h4 style={{ marginBottom: '1rem' }}>{children}</h4>,
  h5: ({ children }) => <h5 style={{ marginBottom: '1rem' }}>{children}</h5>,
  ul: ({ children }) => <ul style={{ marginBottom: '1.2rem' }}>{children}</ul>,
  ol: ({ children }) => <ol style={{ marginBottom: '1.2rem' }}>{children}</ol>,
  li: ({ children }) => <li style={{ fontSize: '18px' }}>{children}</li>,
  blockquote: ({ children }) => (
    <blockquote
      style={{ fontStyle: 'italic', color: '#555', marginLeft: '1rem' }}
    >
      {children}
    </blockquote>
  ),
  a: ({ children, href }) => (
    <a href={href} style={{ color: '#1a0dab', textDecoration: 'underline' }}>
      {children}
    </a>
  ),
  img: ({ src, alt }) => (
    <img
      src={src}
      alt={alt}
      style={{ maxWidth: '100%', borderRadius: '8px', marginBottom: '1.2rem' }}
    />
  ),
  // code: ({ children }) => (
  //   <code
  //     style={{
  //       backgroundColor: '#f5f5f5',
  //       padding: '2px 4px',
  //       borderRadius: '4px',
  //     }}
  //   >
  //     {children}
  //   </code>
  // ),
  // pre: ({ children }) => (
  //   <pre
  //     style={{
  //       backgroundColor: '#f5f5f5',
  //       padding: '1rem',
  //       borderRadius: '4px',
  //       overflowX: 'auto',
  //     }}
  //   >
  //     <code>{children}</code>
  //   </pre>
  // ),
  table: ({ children }) => (
    <table
      style={{
        borderCollapse: 'collapse',
        width: '100%',
        marginBottom: '1.2rem',
      }}
    >
      {children}
    </table>
  ),
  thead: ({ children }) => (
    <thead style={{ backgroundColor: '#f1f1f1' }}>{children}</thead>
  ),
  tbody: ({ children }) => <tbody>{children}</tbody>,
  tr: ({ children }) => <tr>{children}</tr>,
  th: ({ children }) => (
    <th style={{ border: '1px solid #ddd', padding: '8px', textAlign: 'left' }}>
      {children}
    </th>
  ),
  td: ({ children }) => (
    <td style={{ border: '1px solid #ddd', padding: '8px' }}>{children}</td>
  ),
  Mermaid: ({ chart }) => {
    const ref = useRef();

    useEffect(() => {
      mermaid.initialize({ startOnLoad: false });
      mermaid.contentLoaded();
      if (ref.current) {
        ref.current.innerHTML = chart;
        mermaid.init(undefined, ref.current);
      }
    }, [chart]);

    return <div ref={ref} />;
  },
};

export default MDXComponents;
