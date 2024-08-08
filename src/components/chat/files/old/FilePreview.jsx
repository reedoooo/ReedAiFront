import { Dialog, DialogContent } from '@mui/material';
import Image from 'mui-image';
import React from 'react';
import { AttachFileIcon } from 'assets/humanIcons';
import DrawingCanvas from './DrawingCanvas';

const FilePreview = ({ type, item, isOpen, onOpenChange }) => {
  return (
    <Dialog open={isOpen} onClose={() => onOpenChange(false)}>
      <DialogContent
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          outline: 'none',
          border: 'transparent',
          background: 'transparent',
        }}
      >
        {(() => {
          if (type === 'image') {
            const imageItem = item;

            return imageItem.file ? (
              <DrawingCanvas imageItem={imageItem} />
            ) : (
              <Image
                src={imageItem.base64 || imageItem.url}
                alt="File image"
                width={2000}
                height={2000}
                style={{
                  borderRadius: '8px',
                  maxHeight: '67vh',
                  maxWidth: '67vw',
                }}
              />
            );
          } else if (type === 'file_item') {
            const fileItem = item;
            return (
              <div
                style={{
                  background: 'var(--background-color)',
                  color: 'var(--primary-color)',
                  height: '50vh',
                  minWidth: '700px',
                  overflow: 'auto',
                  whiteSpace: 'pre-wrap',
                  borderRadius: '12px',
                  padding: '16px',
                }}
              >
                <div>{fileItem.content}</div>
              </div>
            );
          } else if (type === 'file') {
            return (
              <div
                style={{
                  borderRadius: '8px',
                  background: '#3b82f6',
                  padding: '8px',
                }}
              >
                <AttachFileIcon />
              </div>
            );
          }
        })()}
      </DialogContent>
    </Dialog>
  );
};

export default FilePreview;
