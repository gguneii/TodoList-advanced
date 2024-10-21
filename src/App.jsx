import { useState } from "react"
import Form from "./components/Form"
import Logo from "./components/Logo"
import Stats from "./components/stats"


function App() {
  const [arr, setArr] = useState([])
  return (
    <>
      <Logo />
      <Form arr={arr} setArr={setArr} />
      <Stats arr={arr} />
    </>
  )
}

export default App