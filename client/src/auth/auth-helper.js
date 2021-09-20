const TOKEN_KEY = "CUENTASCLARAS_USER";

export function setToken(token) {
  localStorage.setItem(TOKEN_KEY, JSON.stringify(token));
}

export function getToken() {
  const userToken = JSON.parse(localStorage.getItem(TOKEN_KEY));
  return userToken.Token;
}

export function getUserName() {
  const userToken = JSON.parse(localStorage.getItem(TOKEN_KEY));
  return userToken.Username;
}

export function deleteToken() {
  localStorage.removeItem(TOKEN_KEY);
}
