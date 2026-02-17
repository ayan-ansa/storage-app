export const userPermissions = (currentUser) => {
  const rolesHierarchy = {
    user: 1,
    manager: 2,
    admin: 3,
    superadmin: 4,
  };
  return {
    canView: (user) => {
      return (
        rolesHierarchy[currentUser.role] > rolesHierarchy[user.role] &&
        currentUser.role != "manager"
      );
    },
    canEditRole: (user) => {
      return rolesHierarchy[currentUser.role] > rolesHierarchy[user.role];
    },
    canDelete: (user) => {
      return (
        rolesHierarchy[currentUser.role] > rolesHierarchy[user.role] &&
        currentUser.role != "manager" &&
        !user.isDeleted
      );
    },
    canRecover: (user) => {
      return currentUser.role === "superadmin" && user.isDeleted;
    },
    canLogout: (user) => {
      return (
        (rolesHierarchy[currentUser.role] > rolesHierarchy[user.role] &&
          user.isLoggedIn) ||
        (currentUser._id === user._id && user.isLoggedIn)
      );
    },
  };
};
