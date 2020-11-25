export const updateObjectArray = (items: any, image_id: any, objPropsName: any, ) => {
  return items.map((u: any) => {
    if(u[objPropsName] === image_id){
      return {...u}
    }
    return u;
  })
}
