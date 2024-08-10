import mermaid from 'mermaid';
import { useEffect, useState } from 'react';

export const useMermaidDiagram = content => {
  const [diagram, setDiagram] = useState('Rendering diagram...');

  useEffect(() => {
    const render = async () => {
      const id = `mermaid-svg-${Math.round(Math.random() * 10000000)}`;

      try {
        await mermaid.parse(content);
        const { svg } = await mermaid.render(id, content);
        setDiagram(svg);
      } catch (error) {
        setDiagram('Unable to render this diagram.');
      }
    };

    render();
  }, [content]);

  return diagram;
};

export default useMermaidDiagram;
