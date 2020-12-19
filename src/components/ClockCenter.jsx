import React, {
  useCallback,
  useLayoutEffect,
  useRef,
  useState
} from "react";
import ClockRight from "./ClockRight";
import TimeArrow from "./TimeArrow";
import { CalculateClockAngle } from "../utils/calculateClockAngle";
import useClock from "../utils/useClock";

export const TimeContext = React.createContext({minutes: 0, seconds: 0}); // createContext/useContext - хук для передачи данных в общую область видимости

//useDebugValue - используется для разработки библиотек, для дебаггинга // относительно определенного условия выводит в консоль служебный ворнинг

//useImperativeHandle(() => {}) // позволяет useRef ограничить использовать методы по отношению к Ref либо переопределить их


const ClockCenter = () => {
 // useReducer() // useReducer - по сути локальный Redux / эта функция принимает переменную типа экшин и на основе экшина меняет значение стейта - возвращает новое состояние

  const [transform, setTransform] = useState();
  const secondArrowRef = useRef();
  const {minutes, seconds, hours, secondAngle, minuteAngle} = useClock();

  useLayoutEffect(() => { // useLayoutEffect - происходит рендер после вычисления и рендера всего элемента (СИНХРОННЫЙ ХУК)
    return setTransform(window.getComputedStyle(secondArrowRef.current).getPropertyValue("transform"))
  }, [seconds]) //добавляем елемент по которому происходят изменения



  const handleHover = (value) => {
    alert(`${value} degree`)
  };
  const memoHandlerHover = useCallback((value) => handleHover(value), [minutes]);

  return (
    <TimeContext.Provider value={{hours, minutes, seconds}}> {/*мы уже передали значение seconds в общий контекст*/}
      <div className="clock-wrapper">
        <div className="clock-center">
          <div className="arrow-info">
            {transform}
          </div>
          <TimeArrow ref={secondArrowRef} angle={secondAngle} type='seconds'/>
          <TimeArrow handleHover={memoHandlerHover} angle={minuteAngle} type='minutes'/>
          <TimeArrow type='hours'/>
        </div>
      </div>
      <ClockRight />
    </TimeContext.Provider>
  )
}

export default ClockCenter;