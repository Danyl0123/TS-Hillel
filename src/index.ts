//1
interface UnionIndexSignature {
  [key: string]: number | string;
}

// 2
interface FunctionIndexSignature {
  [key: string]: (...args: any[]) => any;
}

// 3
interface ArrayLikeObject<T> {
  [index: number]: T;
}

// 4
interface MixedInterface {
  name: string;
  [key: string]: any;
}

// 5
interface BaseInterface {
  [key: string]: any;
}

interface ExtendedInterface extends BaseInterface {
  specificProperty: number;
}

// 6
function checkValues(obj: { [key: string]: any }): boolean {
  for (const key in obj) {
    if (typeof obj[key] !== 'number') {
      return false;
    }
  }
  return true;
}
