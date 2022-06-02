import { useEffect, useState } from "react";

export default function useVisualMode(initial) {
  const [mode, setMode] = useState(initial)
  const [history, setHistory] = useState([initial]);
 
  const transition = (mode, replace = false) => {
    if (replace) {
      const prevHistory = history.slice(0, history.length -1)
      setMode(mode)
      setHistory([...prevHistory, mode])
    } else {
      setMode(mode)
      setHistory([...history, mode])
    }
  }

  const back = () => {
    if (history && history.length >= 2) {
      setHistory(history.slice(0, history.length -1))
      setMode(history[history.length - 2])
    }
  }

  return {
    mode, history, transition, back 
  }
} 