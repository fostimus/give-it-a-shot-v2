export const vw = getViewport()[0];
export const mobileBreakpoint = 769;

/**
 * Helpers
 */

export function getViewport() {
  let viewPortWidth;
  let viewPortHeight;

  // the more standards compliant browsers (mozilla/netscape/opera/IE7) use window.innerWidth and window.innerHeight
  if (typeof window.innerWidth !== "undefined") {
    viewPortWidth = window.innerWidth;
    viewPortHeight = window.innerHeight;
  }

  // IE6 in standards compliant mode (i.e. with a valid doctype as the first line in the document)
  else if (
    typeof document.documentElement !== "undefined" &&
    typeof document.documentElement.clientWidth !== "undefined" &&
    document.documentElement.clientWidth !== 0
  ) {
    viewPortWidth = document.documentElement.clientWidth;
    viewPortHeight = document.documentElement.clientHeight;
  }

  // older versions of IE
  else {
    viewPortWidth = document.getElementsByTagName("body")[0].clientWidth;
    viewPortHeight = document.getElementsByTagName("body")[0].clientHeight;
  }
  return [viewPortWidth, viewPortHeight];
}

// regex password
export function eightCharsOneLetterOneNumber(password) {
  let regex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/;

  return {
    success: regex.test(password),
    failure:
      "Password must have at least 8 characters, at least 1 letter, and at least 1 number"
  };
}
