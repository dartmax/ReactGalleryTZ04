export const computeBoundaries = (data) => {
  let min
  let max

  for (const [, y] of data) {
    if(typeof min !== 'number') min = y
    if(typeof max !== 'number') max = y

    if(min > y) min = y
    if(max < y) max = y
  }
  return [min, max]
}
