function parseLinksFromText(text) {
  if (!text || typeof text !== 'string') {
    return text;
  }
  const patronUrl = /https?:\/\/\S+/g;

  // Reemplaza cada enlace encontrado por un elemento 'a'
  return text.replace(patronUrl, function (url) {
    return '<a href="' + url + '">' + url + '</a>';
  });
}

export const parseLinks = (text) => parseLinksFromText(text);