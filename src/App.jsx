import { useCallback, useEffect, useState, useRef } from 'react'
import './App.css'
// import { useRef } from 'react'

function App() {

  const [length, setLength]=useState(8)
  const [numAllowed, setNumAllowed]=useState(false)
  const [charAllowed, setCharAllowed]=useState(false)
  const [password, setPassword]=useState('')

  const passwordRef=useRef(null)

  const generatePassword=useCallback(()=>{

    //logic

    let pass=''
    let str="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz"

    if(numAllowed)str+="1234567890"
    if(charAllowed)str+="!@#$%^&*?<>/"

    for(let i=1;i<length;i++){
      const randomNumber=Math.floor(Math.random()*str.length+1)
      pass+=str.charAt(randomNumber)
    }
    setPassword(pass)
  },[length,numAllowed,charAllowed])


  useEffect(()=>{
    generatePassword()
  },[length, numAllowed, charAllowed])


  const copyToClipboard=()=>{
    window.navigator.clipboard.writeText(password)
    // alert("Password copied")
    passwordRef.current?.select()
  }

  
  return (
      <div className='w-full max-w-md mx-auto shadow-md rounded-lg px-4 py-3 my-8 bg-gray-800 text-orange-500'>
        <h1 className='text-4xl text-center mb-2 font-bold'>Password Generator</h1>
        <div className='flex shadow rounded-lg overflow-hidden mb-4'>
          <input className='outline-none w-full py-1 px-3 ' type='text' value={password} placeholder='Password' readOnly ref={passwordRef}/>
          <button className='outline-none bg-blue-700 text-white px-3 py-0.5 shrink-0'
          onClick={copyToClipboard}>Copy</button>
        </div>
        <div className='flex text-sm gap-x-2'>

          {/* for defining length */}

          <div className='flex items-center gap-x-1'>
            <input className='cursor-pointer' type='range' min={6} max={20} value={length} 
            onChange={(e)=>{setLength(e.target.value)}}/>
            <label htmlFor='length'>Length :{length}</label>
          </div>

          {/* for numbers */}

          <div className='flex items-center gap-x-1'>
            <input className='cursor-pointer' type='checkbox' defaultChecked={numAllowed} value={length} 
            onChange={()=>{setNumAllowed((prev)=>!prev)}}/>
            <label htmlFor='numbers'>Numbers</label>
          </div>

          {/* for characters */}

          <div className='flex items-center gap-x-1'>
            <input className='cursor-pointer' type='checkbox' defaultChecked={charAllowed} value={length} 
            onChange={()=>{setCharAllowed((prev)=>!prev)}}/>
            <label htmlFor='charInput'>Characters</label>
          </div>
        </div>
      </div>
  )
}

export default App
