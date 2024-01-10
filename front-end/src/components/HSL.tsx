export class HSL {
  h: number;
  s: number;
  l: number;

  constructor(h: number, s: number, l: number) {
    this.h = h;
    this.s = s;
    this.l = l;
  }

  static scale(start: HSL, mid: HSL, end: HSL) {
    return (percentage: number) => {
      if (percentage > 50) {
        return new HSL(
          start.h + ((mid.h - start.h) * percentage) / 50,
          start.s + ((mid.s - start.s) * percentage) / 50,
          start.l + ((mid.l - start.l) * percentage) / 50
        );
      }
      return new HSL(
        mid.h + (end.h - mid.h) * ((percentage - 50) / 50),
        mid.s + (end.s - mid.s) * ((percentage - 50) / 50),
        mid.l + (end.l - mid.l) * ((percentage - 50) / 50)
      );
    };
  }

  toText() {
    return `hsl(${this.h}, ${this.s}%, ${this.l}%)`;
  }

  darker() {
    return new HSL(this.h, this.s * 1.1, this.l * 0.8);
  }

  lighter() {
    return new HSL(
      this.h,
      Math.min(this.s * 0.9, 100),
      Math.min(this.l * 1.5, 100)
    );
  }
}
