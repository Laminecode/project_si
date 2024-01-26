import React, { useState } from 'react';

function Patient({isVisible,setIsVisible}) {
  function handleclick() {
    setIsVisible(false);
  }

  return (
    <form method="post" className={isVisible ? 'form' : 'hidden'}>
        <p>Patient</p>
        <label htmlFor="nom">Nom:</label>
        <input type="text" name="nom" required/>
  
        <label htmlFor="prenom">Prénom:</label>
        <input type="text" id="prenom" name="prenom" required />
        
        <label htmlFor="date_naissance">Date de Naissance:</label>
        <input type="date" id="date_naissance" name="date_naissance" required/>
        
        <label htmlFor="sexe">Sexe:</label>
        <input type="text" id="sexe" name="sexe" required/>
        
        <label htmlFor="record">Record ID:</label>
        <input type="text" id="record" name="record" required/>
        
        <label htmlFor="information">Information:</label>
        <textarea id="information" name="information" required></textarea>
        <div className="buttons">
          <button type="submit">Add Patient</button>
          <button type='button' className='Exit' onClick={()=>handleclick()}>Exit</button>
        </div>
    </form>

  )
}

export default Patient
