const randomStr = require("randomstring");
export const getCookie = (cname) => {
  let name = cname + "=";
  let ca = document.cookie.split(";");
  for (let i = 0; i < ca.length; i++) {
    let c = ca[i];
    while (c.charAt(0) === " ") {
      c = c.substring(1);
    }
    if (c.indexOf(name) === 0) {
      return c.substring(name.length, c.length);
    }
  }
  return "";
};

export const setCookie = (cname, cvalue, exdays) => {
  const randomString = randomStr.generate();
  const d = new Date();
  d.setTime(d.getTime() + exdays * 24 * 60 * 60 * 1000);
  let expires = "expires=" + d.toUTCString();
  cvalue = cvalue + ":" + randomString;
  document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
};

export const clearAllCookies = () => {
  localStorage.removeItem("user");
  const cookies = document.cookie.split("; ");

  for (let i = 0; i < cookies.length; i++) {
    const cookie = cookies[i];
    const eqPos = cookie.indexOf("=");
    const name = eqPos > -1 ? cookie.substr(0, eqPos) : cookie;
    document.cookie =
      name + "=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
  }
};
