export const getTextFromHtml = (htmlText: string) =>
  new DOMParser().parseFromString(htmlText, "text/html").documentElement
    .textContent
