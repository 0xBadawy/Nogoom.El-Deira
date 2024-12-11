// Define roles and their hierarchical relationships
export const ROLES = {
  admin: ["admin", "editor", "star"],
  editor: ["editor", "star"],
  star: ["star"],
  viewer: ["viewer"],
};

// Define route permissions
export const ROUTE_PERMISSIONS = [
  { path: "/dashboard", requiredRoles: ["admin", "editor","viewer"] },
  { path: "/dashboard/home", requiredRoles: ["admin", "editor"] },
  { path: "/dashboard/users", requiredRoles: ["admin", "editor"] },
  { path: "/dashboard/apartments", requiredRoles: ["admin", "editor"] },
  { path: "/dashboard/notifications", requiredRoles: ["admin", "editor"] },
  { path: "/dashboard/Send_Notification", requiredRoles: ["admin", "editor"] },
  { path: "/dashboard/createAd", requiredRoles: ["admin","viewer"] },
  { path: "/dashboard/website_data", requiredRoles: ["admin", "editor"] },
  { path: "/dashboard/employees", requiredRoles: ["admin"] },
  { path: "/dashboard/ads-list", requiredRoles: ["admin", "editor"] },
  { path: "/dashboard/privacy", requiredRoles: ["admin"] },
  { path: "/dashboard/contact", requiredRoles: ["admin", "editor"] },
];
