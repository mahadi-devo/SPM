export const AccessRights = {
  admin: 1,
  organizationalUser: 2,
  user: 3,
};

export const ValidateAccessRight = (prop) => {
  // Get User accessRight from localStorage || get user access right from authContext
  const accessRight = AccessRights.admin;
  return !!prop.includes(accessRight);
};
