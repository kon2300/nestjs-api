export const RESPONSE_STATUS_DESCRIPTION = {
  OK: 'OK',
  CREATED: 'Created',
} as const;

export type ResponseStatusDescription =
  (typeof RESPONSE_STATUS_DESCRIPTION)[keyof typeof RESPONSE_STATUS_DESCRIPTION];
