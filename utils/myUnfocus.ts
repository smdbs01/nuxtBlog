/**
 * Unfocus the current focused element
 */
export default function () {
  const target = document.activeElement;
  if (target) {
    (target as HTMLElement).blur();
  }
}
