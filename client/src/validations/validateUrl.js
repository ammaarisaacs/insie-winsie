export default function (url) {
  const parsed = new URL(url);
  return ["https:", "http:"].includes(parsed.protocol);
}
