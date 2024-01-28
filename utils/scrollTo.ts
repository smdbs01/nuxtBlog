/**
 * Scroll to an element with an offset
 *
 * @param target target element
 * @param offset offset, in px
 */
export default function (target: HTMLElement, offset: number = 0) {
  const pos = target.style.position;
  const top = target.style.top;
  target.style.position = "relative";
  target.style.top = "-" + offset + "px";
  target.scrollIntoView({ behavior: "smooth", block: "start" });
  target.style.top = top;
  target.style.position = pos;
}
