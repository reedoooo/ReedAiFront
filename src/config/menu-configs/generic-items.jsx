import {
  MdOutlinePerson,
  MdOutlineCardTravel,
  MdOutlineLightbulb,
  MdOutlineSettings,
} from 'react-icons/md';

export const genericMenuItems = [
  {
    label: 'Panel 1',
    icon: MdOutlinePerson,
    onClick: () => console.log('Panel 1'),
  },
  {
    label: 'Panel 2',
    icon: MdOutlineCardTravel,
    onClick: () => console.log('Panel 2'),
  },
  {
    label: 'Panel 3',
    icon: MdOutlineLightbulb,
    onClick: () => console.log('Panel 3'),
  },
  {
    label: 'Panel 4',
    icon: MdOutlineSettings,
    onClick: () => console.log('Panel 4'),
  },
];

export default genericMenuItems;
