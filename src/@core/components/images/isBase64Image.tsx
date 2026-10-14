export function isBase64Image(str: string) {
  return str.startsWith('data:image/');
}
