import { mapIndexed, map as map$$1, fold, iterate } from "../fable-library.2.3.18/Seq.js";
import { empty, tryFind, toList } from "../fable-library.2.3.18/Map.js";
import { toString as toString$$1 } from "../fable-library.2.3.18/Date.js";
import { toString as toString$$2 } from "../fable-library.2.3.18/TimeSpan.js";
import { toString as toString$$3 } from "../fable-library.2.3.18/Long.js";
import { comparePrimitives, Lazy, mapCurriedArgs, uncurry } from "../fable-library.2.3.18/Util.js";
import { defaultArgWith, defaultArg } from "../fable-library.2.3.18/Option.js";
import { type, getGenerics, getGenericTypeDefinition, getTupleFields, getTupleElements, isTuple, isGenericType, getElementType, isArray, fullName, getUnionCaseFields, getUnionFields, isUnion, getRecordElements, getRecordField, name, isRecord } from "../fable-library.2.3.18/Reflection.js";
import { fill, map } from "../fable-library.2.3.18/Array.js";
import { toText, printf } from "../fable-library.2.3.18/String.js";
import { declare } from "../fable-library.2.3.18/Types.js";
import { Util$$$CachedEncoders as Util$0024$0024$0024CachedEncoders, Util$002ECache$00601$$GetOrAdd$$43981464 as Util$0024002ECache$002400601$0024$0024GetOrAdd$0024$002443981464 } from "./Types.js";
export function string(value) {
  return value;
}
export function guid(value$$1) {
  return String(value$$1);
}
export function int$(value$$2) {
  return value$$2;
}
export function uint32(value$$3) {
  return value$$3;
}
export function float$(value$$4) {
  return value$$4;
}
export function decimal(value$$5) {
  return String(value$$5);
}
export const nil = null;
export function bool(value$$8) {
  return value$$8;
}
export function object(values) {
  const o = {};
  iterate(function (forLoopVar) {
    o[forLoopVar[0]] = forLoopVar[1];
  }, values);
  return o;
}
export function array(values$$1) {
  return values$$1;
}
export function list(values$$2) {
  return Array.from(values$$2);
}
export function seq(values$$3) {
  return Array.from(values$$3);
}
export function dict(values$$4) {
  return object(toList(values$$4));
}
export function bigint(value$$10) {
  return String(value$$10);
}
export function datetimeOffset(value$$11) {
  return toString$$1(value$$11, "O", {});
}
export function timespan(value$$14) {
  return toString$$2(value$$14);
}
export function int64(value$$17) {
  return String(value$$17);
}
export function uint64(value$$18) {
  return toString$$3(value$$18);
}
export function tuple2(enc1, enc2, v1, v2) {
  return [enc1(v1), enc2(v2)];
}
export function tuple3(enc1$$1, enc2$$1, enc3, v1$$1, v2$$1, v3) {
  return [enc1$$1(v1$$1), enc2$$1(v2$$1), enc3(v3)];
}
export function tuple4(enc1$$2, enc2$$2, enc3$$1, enc4, v1$$2, v2$$2, v3$$1, v4) {
  return [enc1$$2(v1$$2), enc2$$2(v2$$2), enc3$$1(v3$$1), enc4(v4)];
}
export function tuple5(enc1$$3, enc2$$3, enc3$$2, enc4$$1, enc5, v1$$3, v2$$3, v3$$2, v4$$1, v5) {
  return [enc1$$3(v1$$3), enc2$$3(v2$$3), enc3$$2(v3$$2), enc4$$1(v4$$1), enc5(v5)];
}
export function tuple6(enc1$$4, enc2$$4, enc3$$3, enc4$$2, enc5$$1, enc6, v1$$4, v2$$4, v3$$3, v4$$2, v5$$1, v6) {
  return [enc1$$4(v1$$4), enc2$$4(v2$$4), enc3$$3(v3$$3), enc4$$2(v4$$2), enc5$$1(v5$$1), enc6(v6)];
}
export function tuple7(enc1$$5, enc2$$5, enc3$$4, enc4$$3, enc5$$2, enc6$$1, enc7, v1$$5, v2$$5, v3$$4, v4$$3, v5$$2, v6$$1, v7) {
  return [enc1$$5(v1$$5), enc2$$5(v2$$5), enc3$$4(v3$$4), enc4$$3(v4$$3), enc5$$2(v5$$2), enc6$$1(v6$$1), enc7(v7)];
}
export function tuple8(enc1$$6, enc2$$6, enc3$$5, enc4$$4, enc5$$3, enc6$$2, enc7$$1, enc8, v1$$6, v2$$6, v3$$5, v4$$4, v5$$3, v6$$2, v7$$1, v8) {
  return [enc1$$6(v1$$6), enc2$$6(v2$$6), enc3$$5(v3$$5), enc4$$4(v4$$4), enc5$$3(v5$$3), enc6$$2(v6$$2), enc7$$1(v7$$1), enc8(v8)];
}
export function datetime(value$$19) {
  return toString$$1(value$$19, "O", {});
}
export function toString(space, value$$22) {
  return JSON.stringify(value$$22, uncurry(2, null), space);
}
export function option(encoder) {
  return function ($arg$$1) {
    return defaultArgWith(defaultArg($arg$$1, null, encoder), function defThunk() {
      return nil;
    });
  };
}
export function boxEncoder(d) {
  return d;
}
export function unboxEncoder(d$$1) {
  return d$$1;
}

function autoEncodeRecordsAndUnions(extra, isCamelCase, t) {
  if (isRecord(t, true)) {
    const setters = map(function mapping(fi) {
      const targetKey = isCamelCase ? name(fi).slice(null, 0 + 1).toLowerCase() + name(fi).slice(1, name(fi).length) : name(fi);
      const encode$$1 = autoEncoder(extra, isCamelCase, fi[1]);
      return function (source) {
        return function (target) {
          const value$$23 = getRecordField(source, fi);

          if (!(value$$23 == null)) {
            target[targetKey] = encode$$1(value$$23);
          }

          return target;
        };
      };
    }, getRecordElements(t, true), Array);
    return function (source$$1) {
      return fold(uncurry(2, mapCurriedArgs(function folder(target$$1) {
        return function (set) {
          return set(source$$1, target$$1);
        };
      }, [0, [0, 2]])), {}, setters);
    };
  } else if (isUnion(t, true)) {
    return function (value$$24) {
      const patternInput = getUnionFields(value$$24, t, true);
      const matchValue = patternInput[1].length | 0;

      if (matchValue === 0) {
        return name(patternInput[0]);
      } else {
        const len = matchValue | 0;
        const fieldTypes = getUnionCaseFields(patternInput[0]);
        const target$$2 = fill(new Array(len + 1), 0, len + 1, null);
        target$$2[0] = name(patternInput[0]);

        for (let i = 1; i <= len; i++) {
          const encode$$2 = autoEncoder(extra, isCamelCase, fieldTypes[i - 1][1]);
          target$$2[i] = encode$$2(patternInput[1][i - 1]);
        }

        return target$$2;
      }
    };
  } else {
    return function (message) {
      throw new Error(message);
    }(toText(printf("Cannot generate auto encoder for %s. Please pass an extra encoder."))(fullName(t)));
  }
}

function autoEncoder(extra$$1, isCamelCase$$1, t$$1) {
  const fullname = fullName(t$$1);
  const matchValue$$1 = tryFind(fullname, extra$$1);

  if (matchValue$$1 == null) {
    if (isArray(t$$1)) {
      const encoder$$2 = function (t$$2) {
        return autoEncoder(extra$$1, isCamelCase$$1, t$$2);
      }(getElementType(t$$1));

      return function (value$$27) {
        return seq(map$$1(encoder$$2, value$$27));
      };
    } else if (isGenericType(t$$1)) {
      if (isTuple(t$$1)) {
        const encoders = map(function mapping$$1(t$$3) {
          return autoEncoder(extra$$1, isCamelCase$$1, t$$3);
        }, getTupleElements(t$$1), Array);
        return function (value$$28) {
          return seq(mapIndexed(function mapping$$2(i$$1, x) {
            return encoders[i$$1](x);
          }, getTupleFields(value$$28)));
        };
      } else {
        const fullname$$1 = fullName(getGenericTypeDefinition(t$$1));

        if (fullname$$1 === "Microsoft.FSharp.Core.FSharpOption`1[System.Object]") {
          const encoder$$4 = new Lazy(function () {
            return function (d$$2) {
              return d$$2;
            }(option(function (t$$4) {
              return autoEncoder(extra$$1, isCamelCase$$1, t$$4);
            }(getGenerics(t$$1)[0])));
          });

          const d$$4 = function d$$4(value$$29) {
            if (value$$29 == null) {
              return nil;
            } else {
              return encoder$$4.Value(value$$29);
            }
          };

          return d$$4;
        } else if (fullname$$1 === "Microsoft.FSharp.Collections.FSharpList`1[System.Object]" ? true : fullname$$1 === "Microsoft.FSharp.Collections.FSharpSet`1[System.Object]") {
          const encoder$$5 = function (t$$5) {
            return autoEncoder(extra$$1, isCamelCase$$1, t$$5);
          }(getGenerics(t$$1)[0]);

          return function (value$$30) {
            return seq(map$$1(encoder$$5, value$$30));
          };
        } else if (fullname$$1 === "Microsoft.FSharp.Collections.FSharpMap`2[System.Object,System.Object]") {
          const keyType = getGenerics(t$$1)[0];

          const valueEncoder = function (t$$6) {
            return autoEncoder(extra$$1, isCamelCase$$1, t$$6);
          }(getGenerics(t$$1)[1]);

          if (fullName(keyType) === "System.String" ? true : fullName(keyType) === "System.Guid") {
            return function (value$$31) {
              return fold(function folder$$1(target$$3, _arg1$$1) {
                const activePatternResult705 = _arg1$$1;
                target$$3[activePatternResult705[0]] = valueEncoder(activePatternResult705[1]);
                return target$$3;
              }, {}, value$$31);
            };
          } else {
            const keyEncoder = function (t$$7) {
              const clo3 = autoEncoder(extra$$1, isCamelCase$$1, t$$7);
              return function (arg30) {
                return clo3(arg30);
              };
            }(keyType);

            return function (value$$32) {
              return seq(map$$1(function mapping$$3(_arg2) {
                const activePatternResult709 = _arg2;
                return [keyEncoder(activePatternResult709[0]), valueEncoder(activePatternResult709[1])];
              }, value$$32));
            };
          }
        } else {
          return autoEncodeRecordsAndUnions(extra$$1, isCamelCase$$1, t$$1);
        }
      }
    } else if (fullname === "System.Boolean") {
      const d$$5 = function d$$5(value$$33) {
        return value$$33;
      };

      return d$$5;
    } else if (fullname === "System.String") {
      const d$$6 = function d$$6(value$$35) {
        return value$$35;
      };

      return d$$6;
    } else if (fullname === "System.Int32") {
      const d$$7 = function d$$7(value$$37) {
        return value$$37;
      };

      return d$$7;
    } else if (fullname === "System.UInt32") {
      const d$$8 = function d$$8(value$$39) {
        return value$$39;
      };

      return d$$8;
    } else if (fullname === "System.Double") {
      const d$$9 = function d$$9(value$$41) {
        return value$$41;
      };

      return d$$9;
    } else if (fullname === "System.DateTime") {
      const d$$10 = datetime;
      return d$$10;
    } else if (fullname === "System.DateTimeOffset") {
      const d$$11 = datetimeOffset;
      return d$$11;
    } else if (fullname === "System.TimeSpan") {
      const d$$12 = timespan;
      return d$$12;
    } else if (fullname === "System.Guid") {
      const d$$13 = guid;
      return d$$13;
    } else if (fullname === "System.Object") {
      const d$$14 = function d$$14(x$$1) {
        return x$$1;
      };

      return d$$14;
    } else {
      return autoEncodeRecordsAndUnions(extra$$1, isCamelCase$$1, t$$1);
    }
  } else {
    const encoder$$1 = matchValue$$1[0];
    return encoder$$1;
  }
}

export const Auto = declare(function Thoth_Json_Encode_Auto() {});
export function Auto$reflection() {
  return type("Thoth.Json.Encode.Auto");
}
export function Auto$$$generateEncoderCached$$4AE6C623(isCamelCase$$2, extra$$2, resolver) {
  const t$$8 = resolver.ResolveType();
  return function (d$$15) {
    return d$$15;
  }(Util$0024002ECache$002400601$0024$0024GetOrAdd$0024$002443981464(Util$0024$0024$0024CachedEncoders, fullName(t$$8), function () {
    const isCamelCase$$3 = defaultArg(isCamelCase$$2, false);
    let extra$$3;

    if (extra$$2 == null) {
      extra$$3 = empty({
        Compare: comparePrimitives
      });
    } else {
      const e = extra$$2;
      extra$$3 = e;
    }

    return autoEncoder(extra$$3, isCamelCase$$3, t$$8);
  }));
}
export function Auto$$$generateEncoder$$4AE6C623(isCamelCase$$4, extra$$4, resolver$$2) {
  const isCamelCase$$5 = defaultArg(isCamelCase$$4, false);
  let extra$$5;

  if (extra$$4 == null) {
    extra$$5 = empty({
      Compare: comparePrimitives
    });
  } else {
    const e$$1 = extra$$4;
    extra$$5 = e$$1;
  }

  return function (d$$17) {
    return d$$17;
  }(function (t$$9) {
    return autoEncoder(extra$$5, isCamelCase$$5, t$$9);
  }(resolver$$2.ResolveType()));
}
export function Auto$$$toString$$59982D9A(space$$1, value$$47, isCamelCase$$6, extra$$6, resolver$$4) {
  const encoder$$6 = Auto$$$generateEncoder$$4AE6C623(isCamelCase$$6, extra$$6, resolver$$4);
  return toString(space$$1, encoder$$6(value$$47));
}
export function encode(space$$2, value$$49) {
  return toString(space$$2, value$$49);
}