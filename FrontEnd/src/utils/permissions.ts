import { ROLES, ROUTE_PERMISSIONS } from "../Configuration/permissions";

export const hasPermission = (userRole, requiredRoles) => {
  // console.log(
  //   "Checking permissions for user role:",
  //   userRole,
  //   "against required roles:",
  //   requiredRoles
  // );

  if (!userRole || !requiredRoles.length) return false;

  // التحقق مباشرة إذا كان `userRole` موجودًا في `requiredRoles`
  if (requiredRoles.includes(userRole)) return true;

  const allowedRoles = ROLES[userRole] || [];

  return requiredRoles.some((role) => allowedRoles.includes(role));
};


export const getRoutePermissions = (path) => {
  const route = ROUTE_PERMISSIONS.find((route) => path.startsWith(route.path));
  return route?.requiredRoles || [];
};
