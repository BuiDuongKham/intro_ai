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

// shuffle an array
export const shuffle = (arr, iter) => {
  // find the position of 0 in a nested array
  const findZero = (arr) => {
    const n = arr.length
    for (let i = 0; i < n; ++i) {
      for (let j = 0; j < n; ++j) {
        if (arr[i][j] === 0) {
          return {i: i, j: j}
        }
      }
    }
  }

  // find the possible moves
  const findPossibleMoves = (arr) => {
    const i = findZero(arr).i
    const j = findZero(arr).j
    const n = arr.length
    let dummy = 0
    const res = []
    // to the left
    if (j < n - 1) {
      const dummyMatrix = deepCopy(arr)
      dummy = dummyMatrix[i][j]
      dummyMatrix[i][j] = dummyMatrix[i][j + 1]
      dummyMatrix[i][j + 1] = dummy
      res.push({
        current: dummyMatrix,
        father: arr
      })
    }

    // to the right
    if (j > 0) {
      const dummyMatrix = deepCopy(arr)
      dummy = dummyMatrix[i][j]
      dummyMatrix[i][j] = dummyMatrix[i][j - 1]
      dummyMatrix[i][j - 1] = dummy
      res.push(
        {
          current: dummyMatrix,
          father: arr
        }
      )
    }

    // to the top
    if (i < n - 1) {
      const dummyMatrix = deepCopy(arr)
      dummy = dummyMatrix[i][j]
      dummyMatrix[i][j] = dummyMatrix[i + 1][j]
      dummyMatrix[i + 1][j] = dummy
      res.push(
        {
          current: dummyMatrix,
          father: arr
        }
      )
    }

    // to the bottom
    if (i > 0) {
      const dummyMatrix = deepCopy(arr)
      dummy = dummyMatrix[i][j]
      dummyMatrix[i][j] = dummyMatrix[i - 1][j]
      dummyMatrix[i - 1][j] = dummy
      res.push(
        {
          current: dummyMatrix,
          father: arr
        }
      )
    }

    return res
  }

  for (let i = 0; i < iter; ++i) {
    const possibleMoves = findPossibleMoves(arr)
    const randomIndex = Math.floor(Math.random() * possibleMoves.length)
    arr = possibleMoves[randomIndex].current
  }

  return arr
}