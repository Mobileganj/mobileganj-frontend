export function setAuthCookies(token: string, role: string) {
  const maxAge = 30 * 24 * 60 * 60; // 30 days
  document.cookie = `auth-token=${token}; path=/; max-age=${maxAge}; SameSite=Lax`;
  document.cookie = `auth-role=${role}; path=/; max-age=${maxAge}; SameSite=Lax`;
}

export function clearAuthCookies() {
  document.cookie = 'auth-token=; path=/; max-age=0';
  document.cookie = 'auth-role=; path=/; max-age=0';
}
