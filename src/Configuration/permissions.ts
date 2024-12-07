// Define roles and their hierarchical relationships
export const ROLES = {
  admin: ["admin", "manager", "user"],
  manager: ["manager", "user"],
  user: ["user"],
  watcher: ["watcher"],
};

// Define route permissions
export const ROUTE_PERMISSIONS = [
  { path: "/dashboard", requiredRoles: ["admin", "manager"] },
  { path: "/dashboard/home", requiredRoles: ["admin", "manager"] },
  { path: "/dashboard/users", requiredRoles: ["admin", "manager"] },
  { path: "/dashboard/apartments", requiredRoles: ["admin", "manager"] },
  { path: "/dashboard/notifications", requiredRoles: ["admin", "manager"] },
  { path: "/dashboard/createAd", requiredRoles: ["admin","watcher"] },
  { path: "/dashboard/website_data", requiredRoles: ["admin", "manager"] },
  { path: "/dashboard/employees", requiredRoles: ["admin"] },
  { path: "/dashboard/ads-list", requiredRoles: ["admin", "manager"] },
  { path: "/dashboard/privacy", requiredRoles: ["admin"] },
  { path: "/dashboard/contact", requiredRoles: ["admin", "manager"] },
];
