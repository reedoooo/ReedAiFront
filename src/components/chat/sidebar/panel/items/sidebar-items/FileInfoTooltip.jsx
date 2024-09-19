import PropTypes from 'prop-types';
import { formatFileSize } from '@/lib/fileUtils';

/**
 * Displays file information inside a tooltip.
 *
 * @component
 * @param {Object} props - The component props.
 * @param {Object} props.file - The file object containing file details.
 * @returns {ReactNode} The tooltip content with file information.
 */
export const FileInfoTooltip = ({ file }) => {
  if (!file) {
    return <div>No file information available</div>;
  }

  return (
    <div>
      <p>
        <strong>Name:</strong> {file.name || 'N/A'}
      </p>
      <p>
        <strong>Type:</strong> {file.type || 'N/A'}
      </p>
      <p>
        <strong>Size:</strong> {file.size ? formatFileSize(file.size) : 'N/A'}
      </p>
      <p>
        <strong>Last Modified:</strong>{' '}
        {file.metadata.lastModified
          ? new Date(file.metadata.lastModified).toLocaleString()
          : 'N/A'}
      </p>
    </div>
  );
};

FileInfoTooltip.propTypes = {
  file: PropTypes.object.isRequired,
};
