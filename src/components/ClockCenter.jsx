import React, {
  useCallback, useContext,
  useLayoutEffect,
  useRef,
  useState
} from "react";
import ClockRight from "./ClockRight";
import TimeArrow from "./TimeArrow";
import {ClockContext} from "../state/timeProvider";
import BuggyCounter from "./BigTodoApp/components/Counter";

//export const TimeContext = React.createContext({minutes: 0, seconds: 0}); // createContext/useContext - хук для передачи данных в общую область видимости

//useDebugValue - используется для разработки библиотек, для дебаггинга // относительно определенного условия выводит в консоль служебный ворнинг

//useImperativeHandle(() => {}) // позволяет useRef ограничить использовать методы по отношению к Ref либо переопределить их


const ClockCenter = () => {
 // useReducer() // useReducer - по сути локальный Redux / эта функция принимает переменную типа экшин и на основе экшина меняет значение стейта - возвращает новое состояние

  const [transform, setTransform] = useState();
  const {minutes, seconds, hours, secondAngle, minuteAngle, hoursAngle} = useContext(ClockContext);

  const secondArrowRef = useRef();
  const minuteArrowRef = useRef();
  const hourArrowRef = useRef();

  useLayoutEffect(() => { // useLayoutEffect - происходит рендер после вычисления и рендера всего элемента (СИНХРОННЫЙ ХУК)
    if (secondArrowRef) {
      return setTransform(window.getComputedStyle(secondArrowRef.current).getPropertyValue("transform"))
    }
    if (minuteArrowRef) {
      return setTransform(window.getComputedStyle(minuteArrowRef.current).getPropertyValue("transform"))
    }
    if (hourArrowRef){
      return setTransform(window.getComputedStyle(hourArrowRef.current).getPropertyValue("transform"))
    }
  }, [seconds, minutes, hours]) //добавляем елемент по которому происходят изменения

  const handleHover = (value) => {
    console.log(value);
  };

  const memoHandlerHover = useCallback((value) => handleHover(value), [minutes]);
  const memoHandlerHoverHour = useCallback((value) => handleHover(value), [hours]);
  return (
    <div> {/*мы уже передали значение seconds в общий контекст*/}
      <div className="clock-wrapper">
        <div className="clock-center">
          <TimeArrow ref={secondArrowRef} angle={secondAngle} type='seconds'/>
          <TimeArrow ref={minuteArrowRef} handleHover={memoHandlerHover} angle={minuteAngle} type='minutes'/>
          <TimeArrow ref={hourArrowRef} handleHover={memoHandlerHoverHour} angle={hoursAngle} type='hours'/>
          <div className="arrow-info">
            {transform}
          </div>
        </div>

      </div>
      <ClockRight />
      <BuggyCounter />
    </div>
  )
}

export default ClockCenter;