import { Avatar, Dialog, DialogContent } from '@mui/material';
import { FilePresentIcon } from 'assets/humanIcons';
import DrawingCanvas from './DrawingCanvas';

export const FilePreview = ({ type, item, isOpen, onOpenChange }) => {
  return (
    <Dialog open={isOpen} onClose={() => onOpenChange(false)} maxWidth="lg">
      <DialogContent
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          outline: 'none',
          border: 'none',
          backgroundColor: 'transparent',
        }}
      >
        {(() => {
          if (type === 'image') {
            const imageItem = item;
            return imageItem.file ? (
              <DrawingCanvas imageItem={imageItem} />
            ) : (
              <Avatar
                className="rounded"
                src={imageItem.base64 || imageItem.url}
                alt="File image"
                width={2000}
                height={2000}
                style={{
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
                  backgroundColor: '#1C1C1C',
                  color: '#FFFFFF',
                  height: '50vh',
                  minWidth: '700px',
                  overflow: 'auto',
                  whiteSpace: 'pre-wrap',
                  borderRadius: '8px',
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
                  backgroundColor: '#2196F3',
                  padding: '16px',
                }}
              >
                <FilePresentIcon />
              </div>
            );
          }
        })()}
      </DialogContent>
    </Dialog>
  );
};

export default FilePreview;
