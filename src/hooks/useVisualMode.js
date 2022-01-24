import React, {useState} from "react"

const useVisualMode = (initial) => {
  const [mode, setMode] = useState(initial);
  const [history, setHistory] = useState([initial]);

  const transition = (newMode, replace = false) => {
    setHistory(prevHistory => replace ? [...prevHistory.slice(0, prevHistory.length-1), newMode] :[...prevHistory, newMode])
    setMode(newMode)
  }
  const back = () => {
    if(history.length < 2) return
    setHistory(prevHistory => prevHistory.slice(0, -1))
    setMode(history[history.length -2])
  }
  return {mode, transition, back }
}
export default useVisualMode;