import React from 'react';
import useMermaidDiagram from 'hooks/ui/useMermaidDiagram';

export const Mermaid = ({ content }) => {
  const diagram = useMermaidDiagram(content);

  if (diagram === 'Rendering diagram...') {
    return <p>Rendering diagram...</p>;
  } else if (diagram === 'Unable to render this diagram.') {
    return <p>Unable to render this diagram.</p>;
  } else {
    return <div dangerouslySetInnerHTML={{ __html: diagram }} />;
  }
};

export default Mermaid;
