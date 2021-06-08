import Decimal from 'decimal.js';

export interface DiamondProperties {
  carat: Decimal;
  cut: DiamondCut;
  color: DiamondColor;
  clarity: DiamondClarity;
}

export enum DiamondCut {
  Cushion = 'cushion',
  Radiant = 'radiant',
  Princess = 'princess',
  Asscher = 'asscher',
  Round = 'round',
  Heart = 'heart',
  Triliant = 'triliant',
  Oval = 'oval',
  Pear = 'pear',
  Emerald = 'emerald',
  Marquise = 'marquise',
  Baguette = 'baguette',
}

export enum DiamondColor {
  D = 'd',
  E = 'e',
  F = 'f',

  G = 'g',
  H = 'h',
  I = 'i',
  J = 'j',

  K = 'k',
  L = 'l',
  M = 'm',
  N = 'n',
  O = 'o',
  P = 'p',
  Q = 'q',
  R = 'r',

  S = 's',
  T = 't',
  U = 'u',
  V = 'v',
  W = 'w',
  X = 'x',
  Y = 'y',
  Z = 'z',
}

export enum DiamondClarity {
  FL = 'fl',
  IF = 'if',

  VVS1 = 'vvs1',
  VVS2 = 'vvs2',

  VS1 = 'vs1',
  VS2 = 'vs2',

  SI1 = 'si1',
  SI2 = 'si2',
  SI3 = 'si3',

  I1 = 'i1',
  I2 = 'i2',
  I3 = 'I3',
}

export interface DiamondRange {
  carat:
    | Decimal
    | {
        min: Decimal;
        max: Decimal;
      };
  cut: DiamondCut;
  color: DiamondColor;
  clarity: DiamondClarity;
}

export function fromLoosePartialDiamondRange(obj: any): Partial<DiamondRange> {
  const range = {} as Partial<DiamondRange>;
  if (obj.carat) {
    range.carat =
      typeof obj.carat === 'string'
        ? new Decimal(obj.carat)
        : {
            min: new Decimal(obj.carat.min),
            max: new Decimal(obj.carat.max),
          };
  }
  if (obj.cut) {
    range.cut = obj.cut.toLowerCase();
  }
  if (obj.color) {
    range.color = obj.color.toLowerCase();
  }
  if (obj.clarity) {
    range.clarity = obj.clarity.toLowerCase();
  }
  return range;
}
