export const sort = function (prop, arr) {
  prop = prop.split('.');
  const len = prop.length;
  
  arr.sort(function (a, b) {
    let i = 0;
    while(i < len) {
      a = a[prop[i]];
      b = b[prop[i]];
      i += 1;
    }

    if (a < b) {
      return -1;
    } else if (a > b) {
      return 1;
    } else {
      return 0;
    }
  });
  return arr;
};
