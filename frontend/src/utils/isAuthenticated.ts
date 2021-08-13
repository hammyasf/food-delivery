let authenticated = false;

export function setIsAuthenticated(s: boolean) {
  authenticated = s;
  return authenticated;
}

export function getIsAuthenticated() {
  return authenticated;
}
