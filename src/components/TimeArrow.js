import React from "react";

const TimeArrow = React.forwardRef(({type, angle, handleHover}, ref) => { // forwardRef - чтобы не оборачивать компонент лишними врапперами - span. div и тд, мы используем этот хук
  return(
    <div onMouseEnter={() =>{handleHover && handleHover(angle)}} ref={ref} style={{transform: `rotate(${angle}deg)`}} className={`time-arrow-wrapper-${type}`}>  {/*и передаем ref в верхний елемент*/}
      <div className={`time-arrow-${type}`}/>
    </div>
  )
});

export default React.memo(TimeArrow);