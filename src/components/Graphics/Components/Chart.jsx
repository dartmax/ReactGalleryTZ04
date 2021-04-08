import React, {useEffect} from "react";
import {useRef} from "react";
import {computeBoundaries} from "./Helpers";

const WIDTH = 600
const HEIGHT = 200
const PADDING = 40
const DPI_WIDTH = WIDTH * 2
const DPI_HEIGHT = HEIGHT * 2
const VIEW_HEIGHT = DPI_HEIGHT - PADDING * 2
const ROWS_COUNT = 5

const Chart = ({data}) => {
  const canvasRef = useRef(null)


  useEffect(() => {
    const canvas = canvasRef.current
    const ctx = canvas.getContext('2d')
    canvas.style.width = WIDTH + 'px'
    canvas.style.height = HEIGHT + 'px'
    canvas.width = DPI_WIDTH
    canvas.height = DPI_HEIGHT
    const [yMin, yMax] = computeBoundaries(data)
    const yRatio = VIEW_HEIGHT / (yMax - yMin)
    // === y axis
    const step = VIEW_HEIGHT / ROWS_COUNT
    const textStep = (yMax - yMin) / ROWS_COUNT
    ctx.beginPath()
    ctx.strokeStyle = '#bbb'
    ctx.font = 'normal 20px Helvetica,sans-serif'
    ctx.fillStyle = '#96a2aa'
      for (let i = 1; i <= ROWS_COUNT; i++) {
        const y = step * i
        const text = yMax - textStep * i
        ctx.fillText(text.toString(), 5, y + PADDING - 10)
        ctx.moveTo(0, y + PADDING)
        ctx.lineTo(DPI_WIDTH, y + PADDING)
      }
    ctx.stroke()
    ctx.closePath()
    // ==

    ctx.beginPath()
    ctx.lineWidth = 4
    ctx.strokeStyle = '#ff0000'
    for (const [x, y] of data) {
      ctx.lineTo(x, DPI_HEIGHT - PADDING - y * yRatio)
    }
    ctx.stroke()
    ctx.closePath()
  }, [WIDTH, HEIGHT])


  return <canvas ref={canvasRef} {...data}/>
}


export default Chart;
