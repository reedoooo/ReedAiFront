import React, { useState } from 'react';
import { Dialog } from 'components/themed/DialogComponents';
import Mermaid from './main';

export const CodeBlock = ({ children, className }) => {
  const [showMermaidPreview, setShowMermaidPreview] = useState(false);

  if (className) {
    const isMermaid = className.includes('language-mermaid');

    return (
      <>
        <code className={className}>{children}</code>
        {isMermaid && (
          <div>
            <button type="button" onClick={() => setShowMermaidPreview(true)}>
              Open Mermaid preview
            </button>
            <Dialog
              open={showMermaidPreview}
              setOpen={setShowMermaidPreview}
              title="Mermaid diagram preview"
              size="3xl"
            >
              <Mermaid content={children?.toString() ?? ''} />
            </Dialog>
          </div>
        )}
      </>
    );
  }

  return <code>{children}</code>;
};

export default CodeBlock;
