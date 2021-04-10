export const computeBoundaries = ({columns, types}) => {
  let min
  let max

  columns.forEach(col => {
    if(types[col[0]] !== 'line') {
      return;
    }
      if(typeof min !== 'number') min = col[1]
      if(typeof max !== 'number') max = col[1]

      if(min > col[1]) min = col[1]
      if(max < col[1]) max = col[1]

    for(let i = 2; i<col.length; i++){
      if(min > col[i]) min = col[i]
      if(max < col[i]) max = col[i]
    }
  })

  return [min, max]
}
