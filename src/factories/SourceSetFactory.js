// @flow

const WIDTHS = [320, 480, 640, 750, 1080];

class SourceSetFactory {
  static assembleSrc(url: string, width: number): string {
    const lastDotRegex = /\.(?=[^.]+$)/;
    const [urlPrefix, urlSuffix] = url.split(lastDotRegex);
    return `${urlPrefix}_${width}w.${urlSuffix} ${width}w`;
  }

  static create(url: string, widths?: number[] = WIDTHS): string {
    const srcSet = widths.map(width => this.assembleSrc(url, width));
    srcSet.push(`${url} 1080w`);

    return srcSet.join(',');
  }
}

export default SourceSetFactory;
