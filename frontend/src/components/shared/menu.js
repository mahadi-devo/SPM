import { FiHome, FiSettings, FiUser, FiCreditCard } from "react-icons/fi";
import { AccessRights } from "./accessRights";
const menu = [
  {
    name: "Tickets",
    icon: FiCreditCard,
    route: "/admin/tickets",
    default: true,
    entitlement: [AccessRights.admin, AccessRights.organizationalUser],
  },
  {
    name: "Departments",
    icon: FiHome,
    route: "/admin/departments",
    default: false,
    entitlement: [AccessRights.admin, AccessRights.organizationalUser],
  },
  {
    name: "Users",
    icon: FiUser,
    route: "/admin/users",
    default: false,
    entitlement: [AccessRights.admin],
  },
  {
    name: "Ticket",
    icon: FiSettings,
    route: "/customer",
    default: true,
    entitlement: [AccessRights.user],
  },
  {
    name: "Ticket History",
    icon: FiSettings,
    route: "/customer/history",
    default: false,
    entitlement: [AccessRights.user],
  },
];

export default menu;
