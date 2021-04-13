import React, {useEffect} from "react";
import {useRef} from "react";
import {
  toDate,
  isOver,
  line,
  circle,
  computeBoundaries
} from "./utils";

const WIDTH = 600
const HEIGHT = 200
const PADDING = 40
const DPI_WIDTH = WIDTH * 2
const DPI_HEIGHT = HEIGHT * 2
const VIEW_HEIGHT = DPI_HEIGHT - PADDING * 2
const VIEW_WIDTH = DPI_WIDTH
const ROWS_COUNT = 5

const Chart = ({data}) => {
  const canvasRef = useRef(null)
  console.log('getCharData', data);
  let raf

  function yAxis(ctx, yMin, yMax) {
    const step = VIEW_HEIGHT / ROWS_COUNT
    const textStep = (yMax - yMin) / ROWS_COUNT
    ctx.beginPath()
    ctx.lineWidth = 1
    ctx.strokeStyle = '#bbb'
    ctx.font = 'normal 20px Helvetica,sans-serif'
    ctx.fillStyle = '#96a2aa'
    for (let i = 1; i <= ROWS_COUNT; i++) {
      const y = step * i
      const text = Math.round(yMax - textStep * i)
      ctx.fillText(text.toString(), 5, y + PADDING - 10)
      ctx.moveTo(0, y + PADDING)
      ctx.lineTo(DPI_WIDTH, y + PADDING)
    }
    ctx.stroke()
    ctx.closePath()
  }

  function xAxis(ctx, data, xRatio, {mouse}) {
    const colsCount = 6
    const step = Math.round(data.length/colsCount)
    ctx.beginPath()
    for (let i = 1; i< data.length; i++){
      const x = i * xRatio

      if((i - 1) % step === 0){
        const text = toDate(data[i])
        ctx.fillText(text.toString(), x, DPI_HEIGHT - 10)
      }

      if(isOver(mouse, x, data.length, DPI_WIDTH)){
        ctx.save()
        ctx.moveTo(x, PADDING)
        ctx.lineTo(x, DPI_HEIGHT - PADDING)
        ctx.restore()
      }
    }
    ctx.stroke()
    ctx.closePath()
  }

  function toCoords(xRatio, yRatio) {
    return (col) => col.map((y, i) => [
      Math.floor((i - 1) * xRatio),
      Math.floor(DPI_HEIGHT - PADDING - y * yRatio),
    ]).filter((_, i) => i !== 0)
  }

  useEffect(() => {
    const canvas = canvasRef.current
    const ctx = canvas.getContext('2d')
    canvas.style.width = WIDTH + 'px'
    canvas.style.height = HEIGHT + 'px'
    canvas.width = DPI_WIDTH
    canvas.height = DPI_HEIGHT

    const clear = () => {
      ctx.clearRect(0, 0, DPI_WIDTH, DPI_HEIGHT)
    }

    function paint() {
      clear()
      const [yMin, yMax] = computeBoundaries(data)
      const yRatio = VIEW_HEIGHT / (yMax - yMin)
      const xRatio = VIEW_WIDTH / (data.columns[0].length - 2)

      const yData = data.columns.filter((col) => data.types[col[0]] === 'line')
      const xData = data.columns.filter((col) => data.types[col[0]] !== 'line')[0]


      yAxis(ctx, yMin, yMax)
      xAxis(ctx, xData, xRatio, proxy)


      yData.map(toCoords(xRatio, yRatio)).forEach((coords, idx) => {
        const color = data.colors[yData[idx][0]]
        line(ctx, coords, {color})

        for (const [x, y] of coords) {
          if(isOver(proxy.mouse, x, coords.length, DPI_WIDTH)){
            circle(ctx, [x, y], color)
            break
          }
        }
      })
    }



    const proxy = new Proxy({}, {
      set(...args){
        const result = Reflect.set(...args)
        raf = requestAnimationFrame(paint)
        return result
      }
    })

    const mousemove = ({clientX, clientY}) => {
      const {left} = canvas.getBoundingClientRect()
      proxy.mouse = {
        x: (clientX - left) * 2
      }
    }
    const mouseleave = () => {
      proxy.mouse = null
    }

    canvas.addEventListener('mousemove', mousemove)
    canvas.addEventListener('mouseleave', mouseleave)

    return () => {
      const init = () => {
        paint()
      }
      init()
      cancelAnimationFrame(raf)
      canvas.removeEventListener('mousemove', mousemove)
      canvas.removeEventListener('mouseleave', mouseleave)
    }
  }, [data, raf])


debugger;
  return <canvas ref={canvasRef} {...data}/>
}


export default Chart;
