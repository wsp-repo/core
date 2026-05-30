import { describe, it, expect } from 'vitest';

import { toObject } from '../toObject';

type ObjValue = {
  bool: boolean;
  date: Date;
  null: null;
  num: number;
  str: string;
};

class ClsValue implements ObjValue {
  public bool!: boolean;
  public date!: Date;
  public null!: null;
  public num!: number;
  public str!: string;

  constructor(obj: ObjValue) {
    this.bool = obj.bool;
    this.date = obj.date;
    this.null = obj.null;
    this.num = obj.num;
    this.str = obj.str;
  }
}

class GetValue implements ObjValue {
  public bool!: boolean;
  public date!: Date;
  public null!: null;
  public num!: number;

  private strVal!: string;

  constructor(obj: ObjValue) {
    this.bool = obj.bool;
    this.date = obj.date;
    this.null = obj.null;
    this.num = obj.num;
    this.strVal = obj.str;
  }

  public get str(): string {
    return this.strVal;
  }
}

const objValue: ObjValue = {
  num: 12345,
  str: 'string',
  date: new Date(),
  bool: true,
  null: null,
};

describe('Helpers object functions', () => {
  it('getKeys (class properties)', () => {
    const clsValue = new ClsValue(objValue);
    const newValue = toObject(clsValue);

    expect(newValue).toEqual(objValue);
  });

  it('getKeys (class getter)', () => {
    const clsValue = new GetValue(objValue);
    const newValue = toObject(clsValue, ['strVal']);

    expect(newValue).toEqual(objValue);
  });
});
