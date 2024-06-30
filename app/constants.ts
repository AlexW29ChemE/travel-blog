export function isProduction() {
  return process.env.NODE_ENV === "production";
}
export function isDev() {
  return process.env.NODE_ENV === "development";
}
export function isBrowser() {
  return window !== undefined;
}

export function isAuthorised(email?:string|null){
  return isDev() || email && email === process.env.ADMIN_EMAIL
}