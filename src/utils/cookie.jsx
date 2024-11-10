import { Cookies } from 'react-cookie'

const cookies = new Cookies()

export const setCookie = (key, value, days) => {
  const expires = new Date()
  expires.setUTCDate(expires.getUTCDate() + days)

  return cookies.set(key, value, { expires: expires, path: '/' })
}

export const getCookie = (key) => {
  return cookies.get(key)
}

export const removeCookie = (key, path = '/') => {
  cookies.remove(key, { path: path })
}
