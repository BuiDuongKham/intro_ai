import {Stack, Queue} from "datastructures-js";
// Wrapping all
const wrapped = (initialState) =>
{
  const resultDiary = []
  resultDiary.push({
    current: initialState,
    father: undefined
  })
  const myStack = new Queue()
  myStack.push({
    current: initialState,
    father: undefined
  })

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
    const limit = 10000
    let count = 0
    while (myStack.size() > 0 && count < limit) {
      count += 1
      const currentState = myStack.pop()
      const currentMatrix = currentState.current
      // find the index of number 9
      let i = 0
      let j = 0
      const n = currentMatrix.length
      for (let k = 0; k < n; ++k) {
        for (let l = 0; l < n; ++l) {
          if (currentMatrix[k][l] === 0) {
            i = k
            j = l
          }
        }
      }
      const destination1 = []
      const destination2 = []
      for (let k = 0; k < n; ++k) {
        const tmp1 = []
        const tmp2 = []
        for (let l = 0; l < n; ++l) {
          tmp1.push(k*n+l)

          if (k == n-1 && l == n-1) {
            tmp2.push(0)
          } else {
            tmp2.push(k*n+l+1)
          }
        }
        destination1.push(tmp1)
        destination2.push(tmp2)
      }
      const candidate = forceSearch(currentMatrix, i, j)
      for (const candidateElement of candidate) {
        if (isDescendant(candidateElement)) {
          resultDiary.push(candidateElement)
          myStack.push(candidateElement)
          if (isEqual(candidateElement.current, destination1) ||
            isEqual(candidateElement.current, destination2)) {
            console.log('found')
            console.log(candidateElement.current)
            return
          }
        }
      }
    }

    if (count >= limit) {
      console.log('not found')
      resultDiary.push({
        current: initialState,
        father: undefined
      })
    }
  }
  const retrieve = (state) => {
    const res = []
    let currentState = state
    res.push(currentState.current)
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

  search()

  const path = retrieve(resultDiary[resultDiary.length - 1])

  return path

}

export default function (req,res){
  const temp = wrapped(JSON.parse(req.body).data)
  const solution = temp.reverse()
  res.status(200).json({
    solution: solution
  })
}
