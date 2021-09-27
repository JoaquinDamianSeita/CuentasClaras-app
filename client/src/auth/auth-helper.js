
//Este archivo se encargar del manejo de los JWT de los usuarios

const TOKEN_KEY = "CUENTASCLARAS_USER";

export function setToken(token) {
  localStorage.setItem(TOKEN_KEY, JSON.stringify(token));
}

export function getToken(clave) {
  const userToken = JSON.parse(localStorage.getItem(TOKEN_KEY));
  if (!userToken && !clave) {
    return null
  }
  if (!userToken && clave) {
    return null
  }
  return userToken.Token;
}

export function getUserName() {
  const userToken = JSON.parse(localStorage.getItem(TOKEN_KEY));
  if (!userToken) {
    return null
  }
  return userToken.Username;
}

export function deleteToken() {
  localStorage.removeItem(TOKEN_KEY);
}
