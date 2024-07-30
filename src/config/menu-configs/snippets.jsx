import { AddIcon, InsertDriveFileOutlined } from 'assets/humanIcons';

export const snippetsMenuItems = [
  {
    label: 'Say hello',
    icon: <AddIcon />,
    onClick: () => console.log('Say hello selected'),
  },
  {
    label: 'Provide help',
    icon: <InsertDriveFileOutlined />,
    onClick: () => console.log('Provide help selected'),
  },
  {
    label: 'Arrange callback',
    icon: <InsertDriveFileOutlined />,
    onClick: () => console.log('Arrange callback selected'),
  },
  {
    label: 'Satisfaction poll',
    icon: <InsertDriveFileOutlined />,
    onClick: () => console.log('Satisfaction poll selected'),
  },
];

export default snippetsMenuItems;
