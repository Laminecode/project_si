import React from 'react'

function Medecin({isVisible,setIsVisible}) {
  function handleclick(){
    setIsVisible(false)
  }
  return (
    <form method="post" className={isVisible ? 'form' : 'hidden'}>
        <p>Medecin</p>
        <label htmlFor="id">ID:</label>
        <input type="text" id="id" name="id" required/>
        <label htmlFor="nom">Nom:</label>
        <input type="text" id="nom" name="nom" required/>
        <label htmlFor="prenom">Prénom:</label>
        <input type="text" id="prenom" name="prenom" required/>
        <label htmlFor="specialite">specialite:</label>
        <input type="text" id="specialite" name="specialite" required/>
        <div className="buttons">
          <button type="submit">Add medecin</button>
          <button type='button' className='Exit' onClick={handleclick}>Exit</button>
        </div>
    </form>
  )
}

export default Medecin
