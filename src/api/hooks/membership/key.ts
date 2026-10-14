export const membershipKeys = {
  all: ['membership'] as const,
  listing: () => [...membershipKeys.all, 'listing'] as const,
  details: (id: string) => [...membershipKeys.all, 'details', id] as const,
};
