import Login from "./components/Login";
import Home from "./components/Home";
import HomeTrends from "./components/HomeTrends";
import { useState } from 'react'

function App() {
  
  const [showLogin, setShowLogin] = useState(true)
  const [showHome, setShowHome] = useState(false)
  const [showHomeTrends, setShowHomeTrends] = useState(false)
  const [sessionKey, setSessionKey] = useState('')

  //Show Only Login Page
  const loginOnly = async () => {
    setShowLogin(true)
    setShowHome(false)
    setShowHomeTrends(false)
  }
  //Show Only Home Page
  const homeOnly = async () => {
    setShowLogin(false)
    setShowHome(true)
    setShowHomeTrends(false)
  }
  //Show Only HomeTrends Page
  const trendsOnly = async () => {
    setShowLogin(false)
    setShowHome(false)
    setShowHomeTrends(true)
  }

  return (
        <div>
          {showLogin && (<Login homeOnly={() => homeOnly()}
                        trendsOnly={() => trendsOnly()}  
                        setSession={setSessionKey}/> )}  
          {showHome &&
          (<Home loginOnly={() => loginOnly()} 
          sessionKey={sessionKey}/>)}
          {showHomeTrends &&
          (<HomeTrends loginOnly={() => loginOnly()} 
          sessionKey={sessionKey}/>)}
             
        </div> 
  );
}

export default App;
