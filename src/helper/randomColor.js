// @flow

export default function randomColor(): string {
  const colors = ['red', 'blue', 'darkgreen', 'orange', 'purple'];
  return colors[Math.floor(Math.random() * colors.length)];
}
