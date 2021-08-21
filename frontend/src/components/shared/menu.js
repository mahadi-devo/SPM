import {
  FiCompass,
  FiHome,
  FiSettings,
  FiStar,
  FiTrendingUp,
} from 'react-icons/fi';
import { AccessRights } from './accessRights';

const menu = [
  {
    name: 'Tickets',
    icon: FiHome,
    route: '/admin/tickets',
    default: true,
    entitlement: [AccessRights.admin, AccessRights.organizationalUser],
  },
  {
    name: 'Departments',
    icon: FiTrendingUp,
    route: '/admin/departments',
    default: false,
    entitlement: [AccessRights.admin, AccessRights.organizationalUser],
  },
  {
    name: 'Statuses',
    icon: FiCompass,
    route: '/admin/statuses',
    default: false,
    entitlement: [AccessRights.admin, AccessRights.organizationalUser],
  },
  {
    name: 'Users',
    icon: FiStar,
    route: '/admin/users',
    default: false,
    entitlement: [AccessRights.admin],
  },
  {
    name: 'Settings',
    icon: FiSettings,
    route: '/admin/settings',
    default: false,
    entitlement: [AccessRights.admin],
  },
  {
    name: 'Ticket',
    icon: FiSettings,
    route: '/customer',
    default: true,
    entitlement: [AccessRights.user],
  },
  {
    name: 'Ticket History',
    icon: FiSettings,
    route: '/customer/history',
    default: false,
    entitlement: [AccessRights.user],
  },
];

export default menu;
