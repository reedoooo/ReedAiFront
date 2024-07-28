import { AddIcon, InsertDriveFileOutlined } from 'assets/humanIcons';

export const formTemplatesMenuItems = [
  {
    label: 'Select input',
    icon: <InsertDriveFileOutlined />,
    onClick: () => console.log('Select input selected'),
  },
  {
    label: 'Text input',
    icon: <InsertDriveFileOutlined />,
    onClick: () => console.log('Text input selected'),
  },
];

export default formTemplatesMenuItems;
