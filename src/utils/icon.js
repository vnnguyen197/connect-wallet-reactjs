export default function iconSrc(icon) {
  if (icon) {
    return `https://defillama.com/chain-icons/rsz_${icon}.jpg`;
  }
  return "/unknown-logo.png";
}
