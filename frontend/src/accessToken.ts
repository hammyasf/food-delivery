let accessToken = "";

export function setAccessToken(s: string) {
  accessToken = s;
  return accessToken;
}

export function getAccessToken() {
  return accessToken;
}
