export const isAuthorized = (
  currentUser,
  targetUser,
  canSelfLogout = false,
) => {
  const roles = {
    superadmin: 4,
    admin: 3,
    manager: 2,
    user: 1,
  };
  return canSelfLogout
    ? currentUser._id.equals(targetUser._id)
    : roles[currentUser.role] > roles[targetUser.role];
};

export const canViewUser = (currentUser, targetUser) => {
  return (
    isAuthorized(currentUser, targetUser) && currentUser.role !== "manager"
  );
};
