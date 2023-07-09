export const deepCopy = (obj) => {
  if (typeof obj == 'object') {
    if (Array.isArray(obj)) {
      let l = obj.length;
      let r = new Array(l);
      for (let i = 0; i < l; i++) {
        r[i] = deepCopy(obj[i]);
      }
      return r;
    } else {
      let r = {};
      r.prototype = obj.prototype;
      for (let k in obj) {
        r[k] = deepCopy(obj[k]);
      }
      return r;
    }
  }
  return obj;
}