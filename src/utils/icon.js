export default function iconSrc(icon) {
  if (icon) {
    return `https://defillama.com/chain-icons/rsz_${icon}.jpg`;
  }
  return "https://chainlist.org/_next/image?url=%2Funknown-logo.png&w=32&q=75";
}
