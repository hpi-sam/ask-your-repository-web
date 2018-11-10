// @flow

class ColorFactory {
  static getRandomColor(): string {
    const colors: string[] = ['red', 'blue', 'darkgreen', 'orange', 'purple'];
    return colors[Math.floor(Math.random() * colors.length)];
  }
}

export default ColorFactory;
