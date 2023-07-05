const {Stack} = require('datastructures-js')

// init
const resultDiary = []
const initialState = {
  current: [
    [5,4,1],
    [7,9,3],
    [2,8,6]
  ],
  father: undefined
}
resultDiary.push(initialState)
const myStack = new Stack()
myStack.push(initialState)

// utilities
const isEqual = (a, b) => {
  let k = true
  const n = a.length
  for (let i = 0; i < n; ++i) {
    for (let j = 0; j < n; ++j) {
      if (a[i][j] !== b[i][j]) {
        k = false
      }
    }
  }
  return k
}
const isDescendant = (state) => {
  let currentState = state
  let check = true
  for (const resultDiaryElement of resultDiary) {
    if (resultDiaryElement.father !== undefined && isEqual(currentState.current, resultDiaryElement.father)) {
      return false
    }
  }
  return check
}

const deepCopy = (obj) => {
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

const forceSearch = (matrix, i, j) => {
  const n = matrix.length
  let dummy = 0
  const res = []
  // to the left
  if (j < n - 1) {
    const dummyMatrix = deepCopy(matrix)
    dummy = dummyMatrix[i][j]
    dummyMatrix[i][j] = dummyMatrix[i][j + 1]
    dummyMatrix[i][j + 1] = dummy
    res.push({
      current: dummyMatrix,
      father: matrix
    })
  }

  // to the right
  if (j > 0) {
    const dummyMatrix = deepCopy(matrix)
    dummy = dummyMatrix[i][j]
    dummyMatrix[i][j] = dummyMatrix[i][j - 1]
    dummyMatrix[i][j - 1] = dummy
    res.push(
      {
        current: dummyMatrix,
        father: matrix
      }
    )
  }

  // to the top
  if (i < n - 1) {
    const dummyMatrix = deepCopy(matrix)
    dummy = dummyMatrix[i][j]
    dummyMatrix[i][j] = dummyMatrix[i + 1][j]
    dummyMatrix[i + 1][j] = dummy
    res.push(
      {
        current: dummyMatrix,
        father: matrix
      }
    )
  }

  // to the bottom
  if (i > 0) {
    const dummyMatrix = deepCopy(matrix)
    dummy = dummyMatrix[i][j]
    dummyMatrix[i][j] = dummyMatrix[i - 1][j]
    dummyMatrix[i - 1][j] = dummy
    res.push(
      {
        current: dummyMatrix,
        father: matrix
      }
    )
  }

  return res
}


const search = () => {
  while (myStack.size() > 0) {
    const currentState = myStack.pop()
    const currentMatrix = currentState.current
    // find the index of number 9
    let i = 0
    let j = 0
    const n = currentMatrix.length
    for (let k = 0; k < n; ++k) {
      for (let l = 0; l < n; ++l) {
        if (currentMatrix[k][l] === 9) {
          i = k
          j = l
        }
      }
    }
    const candidate = forceSearch(currentMatrix, i, j)
    for (const candidateElement of candidate) {
      if (isDescendant(candidateElement)) {
        resultDiary.push(candidateElement)
        myStack.push(candidateElement)
        if (isEqual(candidateElement.current, [[1,2,3],[4,5,6],[7,8,9]]) ||
          isEqual(candidateElement.current, [[9,1,2],[3,4,5],[6,7,8]])) {
          console.log('found')
          console.log(candidateElement.current)
          return
        }
      }
    }
  }
}
const retrieve = (state) => {
  const res = []
  let currentState = state
  while (currentState.father !== undefined) {
    res.push(currentState.current)
    for (const resultDiaryElement of resultDiary) {
      if (isEqual(currentState.father, resultDiaryElement.current)) {
        currentState = resultDiaryElement
        break
      }
    }
  }
  res.push(currentState.current)
  return res
}
const path = retrieve(resultDiary[resultDiary.length - 1])

console.log(path)
