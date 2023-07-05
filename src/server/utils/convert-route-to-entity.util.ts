const mapping: Record<string, string> = {
  companies: 'company',
  'environmental-analysts': 'environmental_analyst',
  'public-users': 'public_user',
  'team-members': 'team_member',
  users: 'user',
};

export function convertRouteToEntityUtil(route: string) {
  return mapping[route] || route;
}
