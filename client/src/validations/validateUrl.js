export default function (url) {
  const parsed = new URL(url);
  const check = ["https:", "http:"].includes(parsed.protocol);
  return check ? url : "";
}
