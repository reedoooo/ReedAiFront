import { Box, Typography, Button, Paper } from '@mui/material';
import React from 'react';

function CodeConverter() {
  return (
    <Box sx={{ padding: 2 }}>
      <Box sx={{ marginBottom: 2 }}>
        <Typography variant="h6">Bootstrap Code</Typography>
        <Typography variant="body1">
          Enter the Bootstrap code you want to convert
        </Typography>
        <Paper
          elevation={3}
          sx={{ borderRadius: 2, overflow: 'auto', padding: 2 }}
        >
          <Box
            sx={{
              '& .cm-editor': {
                '& .cm-scroller': {
                  '& .cm-gutters': {
                    '& .cm-gutterElement': {
                      height: 0,
                      visibility: 'hidden',
                      pointerEvents: 'none',
                    },
                    '& .cm-activeLineGutter': {
                      height: '18.1953px',
                      marginTop: '4px',
                    },
                  },
                  '& .cm-content': {
                    tabSize: 4,
                    role: 'textbox',
                    ariaMultiline: 'true',
                    dataLanguage: 'go',
                    ariaAutocomplete: 'list',
                  },
                  '& .cm-layer': {
                    zIndex: 150,
                    animationDuration: '1200ms',
                  },
                  '& .cm-cursor': {
                    left: '35.8281px',
                    top: '5.5px',
                    height: '15px',
                  },
                },
              },
            }}
          >
            <div className="cm-editor">
              <div className="cm-announced" aria-live="polite"></div>
              <div tabIndex="-1" className="cm-scroller">
                <div
                  className="cm-gutters"
                  aria-hidden="true"
                  style={{
                    minHeight: '26.1953px',
                    position: 'sticky',
                  }}
                >
                  <div className="cm-gutter cm-lineNumbers">
                    <div
                      className="cm-gutterElement"
                      style={{
                        height: 0,
                        visibility: 'hidden',
                        pointerEvents: 'none',
                      }}
                    >
                      9
                    </div>
                    <div
                      className="cm-gutterElement cm-activeLineGutter"
                      style={{
                        height: '18.1953px',
                        marginTop: '4px',
                      }}
                    >
                      1
                    </div>
                  </div>
                  <div className="cm-gutter cm-foldGutter">
                    <span title="Unfold line">›</span>
                  </div>
                </div>
                <div
                  spellCheck="false"
                  autoCorrect="off"
                  autoCapitalize="off"
                  translate="no"
                  contentEditable="true"
                  style={{ tabSize: 4 }}
                  className="cm-content"
                  role="textbox"
                  aria-multiline="true"
                  data-language="go"
                  aria-autocomplete="list"
                >
                  <div className="cm-activeLine cm-line">
                    <br />
                  </div>
                  <div
                    className="cm-layer cm-layer-above cm-cursorLayer"
                    style={{
                      zIndex: 150,
                      animationDuration: '1200ms',
                    }}
                  >
                    <div
                      className="cm-cursor cm-cursor-primary"
                      style={{
                        left: '35.8281px',
                        top: '5.5px',
                        height: '15px',
                      }}
                    ></div>
                  </div>
                  <div
                    className="cm-layer cm-selectionLayer"
                    style={{ zIndex: -2 }}
                  ></div>
                </div>
              </div>
            </div>
          </Box>
        </Paper>
        <Button variant="contained" color="primary" sx={{ marginTop: 2 }}>
          Convert your Code
        </Button>
      </Box>
      <Box>
        <Typography variant="h6">Tailwind CSS Code</Typography>
        <Typography variant="body1">Enjoy your converted code!</Typography>
      </Box>
    </Box>
  );
}

export default CodeConverter;
