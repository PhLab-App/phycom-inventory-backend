module.exports = {
  AUTHENTICATION: {
    ONLY_ADMIN: [1],
    ONLY_MEMBERS: [2],
    ALL: [1, 2],
  },
  LOAN_STATUSES: ["PENDING", "REJECTED", "CONFIRMED", "CANCELLED", "DELIVERED", "OVERDUE", "RETURNED"],
  USER_STATUSES: {
    ACTIVE: "ACTIVE",
    INACTIVE: "INACTIVE",
  },
};
