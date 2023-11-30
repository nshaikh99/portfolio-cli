import React, {useState, useRef, useEffect, useCallback} from 'react'
import compute from '../helpers/commands'

const Shell = () => {
    const history = useRef([])
    const undo = useRef([])
    const redo = useRef([])
    const output = useRef([])
    const stdout = useRef([])
    const [renders, setRenders] = useState(0)
    const asciiArt = ` /$$   /$$           /$$                           /$$        /$$$$$$  /$$                 /$$ /$$       /$$      
| $$$ | $$          | $$                          | $$       /$$__  $$| $$                |__/| $$      | $$      
| $$$$| $$  /$$$$$$ | $$$$$$$   /$$$$$$   /$$$$$$ | $$      | $$  \\__/| $$$$$$$   /$$$$$$  /$$| $$   /$$| $$$$$$$ 
| $$ $$ $$ |____  $$| $$__  $$ /$$__  $$ /$$__  $$| $$      |  $$$$$$ | $$__  $$ |____  $$| $$| $$  /$$/| $$__  $$
| $$  $$$$  /$$$$$$$| $$  \\ $$| $$$$$$$$| $$$$$$$$| $$       \\____  $$| $$  \\ $$  /$$$$$$$| $$| $$$$$$/ | $$  \\ $$
| $$\\  $$$ /$$__  $$| $$  | $$| $$_____/| $$_____/| $$       /$$  \\ $$| $$  | $$ /$$__  $$| $$| $$_  $$ | $$  | $$
| $$ \\  $$|  $$$$$$$| $$$$$$$/|  $$$$$$$|  $$$$$$$| $$      |  $$$$$$/| $$  | $$|  $$$$$$$| $$| $$ \\  $$| $$  | $$
|__/  \\__/ \\_______/|_______/  \\_______/ \\_______/|__/       \\______/ |__/  |__/ \\_______/|__/|__/  \\__/|__/  |__/
`

    const handleKeyPress = useCallback((e) => {
        if(e.key === 'Enter') {
            // save and compute current operation
            history.current.push(e.target.value)
            output.current.push(compute(e.target.value))

            // clear undo/redo
            undo.current = history.current.slice()
            redo.current = []

            // format history and output
            const formattedHistory = history.current.map((line, index) => (<span key={"history-" + index}><p className='text-green-400 whitespace-pre inline'>[guest@nabeelshaikh.com] $ </p><p className='text-white inline'>{line}</p><br /></span>))
            const formattedOutput = output.current.map((line, index) => (<span key={"output-" + index}><p className='text-white whitespace-pre inline'>{line}</p></span>))

            // display output
            stdout.current = formattedHistory.map((line, index) => (<span key={index}>{line}{formattedOutput[index]}</span>))
            e.target.value = ''
            setRenders(renders + 1)
        }
        if(e.key === 'ArrowUp') {
            if(undo.current.length > 0) redo.current.push(e.target.value)
            e.target.value = undo.current.length > 0 ? undo.current.pop() : e.target.value
        }
        if(e.key === 'ArrowDown') {
            if(redo.current.length > 0) undo.current.push(e.target.value)
            e.target.value = redo.current.length > 0 ? redo.current.pop() : e.target.value
        }
    }, [renders])

    useEffect(() => {
        window.addEventListener('keydown', handleKeyPress)

        return () => {
            window.removeEventListener('keydown', handleKeyPress)
        }
    }, [handleKeyPress])
    
  return (
    <div className='w-full h-screen overflow-y-scroll bg-black text-base'>
        <p className='text-white whitespace-pre'>{asciiArt}</p>
        <p className='text-white'>Welcome to the command-line version of my website!</p>
        <p className='text-white'>Type 'help' to see a list of available commands.</p>
        {stdout.current}
        <div className='w-full flex'>
            <label className='text-green-400 whitespace-pre'>[guest@nabeelshaikh.com] $ </label>
            <input autoFocus className='w-full grow focus:outline-none bg-black text-white'></input>
        </div>
    </div>
  )
}

export default Shell