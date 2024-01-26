import { useState } from 'react'
import './App.css'
import Patient from "./forms/patient"
import Medecin from "./forms/Medecin"
import Visite from './forms/Visite'
import Hopitalisation from "./forms/Hospitalisation"
import Record from "./forms/Record"
import Analyse from "./forms/Analyse"
import Chirugie from "./forms/Chirugie"
import Control from './forms/Control'
import Vaccination from './forms/Vaccination'
import img from './assets/logo.png'



function Nav(){
return(
    <nav>
        <img src={img} alt="logo"/>
        <h2>HOSPITAL</h2>
        <div>
            <a href="">Home</a>
            <a href="">About</a>
            <a href="">Contact</a>
        </div>
    </nav>
)
}
function Choise(){
return(
  <div>
    <button>Hospitalisa</button>
    <button></button>
    <button></button>
    <button></button>
    <button></button>
    <button></button>
  </div>
)
}


function Container({handleclick}){
return(
  <>
    <div className='sidebar'>
      <h4>Patient</h4>
      <h4>Medecin</h4>
      <h4>Record</h4>
    </div>
    <div className="container">
      <button type="button" className="new" onClick={()=>handleclick('Patient')}>new Patient</button>
      <button type="button" className="new" onClick={()=>handleclick('Medecin')}>new Medecin</button>
      <button type="button" className="new">rendezvous</button>  
    </div>
  </>
)
}

function App() {
  const [isVisible,setIsVisible] = useState({Patient:false,Medecin:false})
  function handleclick(component){
    setIsVisible((prevVisibility) => ({
      ...prevVisibility,
      [component]: true,
    }));
}
  return (
    <>
      <Nav/>
      {/* <SideBar/> */}
      <Container handleclick={handleclick}/>
      <Medecin isVisible={isVisible.Medecin} setIsVisible={(value) => setIsVisible({ ...isVisible, Medecin: value })} />
      <Patient isVisible={isVisible.Patient} setIsVisible={(value) => setIsVisible({ ...isVisible, Patient: value })}/>
      {/* <Hopitalisation/>
      <Visite/>
      <Vaccination/>
      <Control/>
      <Record/>
      <Control/>
      <Chirugie/>
      <Analyse/> */}
    </>
  )
}

export default App
