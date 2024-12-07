import { ROLES, ROUTE_PERMISSIONS } from "../Configuration/permissions";

export const hasPermission = (userRole, requiredRoles) => {
  if (!userRole || !requiredRoles.length) return false;

  const allowedRoles = ROLES[userRole] || [];
  return requiredRoles.some((role) => allowedRoles.includes(role));
};

export const getRoutePermissions = (path) => {
  const route = ROUTE_PERMISSIONS.find((route) => path.startsWith(route.path));
  return route?.requiredRoles || [];
};
