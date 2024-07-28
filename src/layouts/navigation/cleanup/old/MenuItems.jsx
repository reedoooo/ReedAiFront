import { uniqueId } from 'lodash';
import {
  FaTachometerAlt,
  FaFileAlt,
  FaCopy,
  FaSignInAlt,
  FaUserPlus,
  FaSmile,
  FaCameraRetro,
} from 'react-icons/fa';

const Menuitems = [
  {
    navlabel: true,
    subheader: 'Home',
  },
  {
    id: uniqueId(),
    title: 'Dashboard',
    icon: FaTachometerAlt,
    href: '/dashboard',
  },
  {
    subheader: 'Utilities',
  },
  {
    id: uniqueId(),
    title: 'Typography',
    icon: FaFileAlt,
    href: '/ui/typography',
  },
  {
    id: uniqueId(),
    title: 'Shadow',
    icon: FaCopy,
    href: '/ui/shadow',
  },
  {
    subheader: 'Auth',
  },
  {
    id: uniqueId(),
    title: 'Login',
    icon: FaSignInAlt,
    href: '/auth/login',
  },
  {
    id: uniqueId(),
    title: 'Register',
    icon: FaUserPlus,
    href: '/auth/register',
  },
  {
    subheader: 'Extra',
  },
  {
    id: uniqueId(),
    title: 'Icons',
    icon: FaSmile,
    href: '/icons',
  },
  {
    id: uniqueId(),
    title: 'Sample Page',
    icon: FaCameraRetro,
    href: '/sample-page',
  },
];

export default Menuitems;
