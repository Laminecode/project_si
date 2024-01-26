import React from 'react'

function Visite() {
  function handleclick(){
    let form = document.querySelector('.Visite')
    form.style.display = 'none';
  }
  return (
    <form method="post" className='Visite'>
        <p>Visite</p>
        <label htmlFor="id">ID:</label>
        <input type="text" id="id" name="id"  required/>
        <label htmlFor="record">Record ID:</label>
        <input type="text" id="record" name="record"  required/>
        <label htmlFor="medecin">Médecin ID:</label>
        <input type="text" id="medecin" name="medecin"  required/>
        <label htmlFor="result">Résultat:</label>
        <textarea id="result" name="result" required></textarea> 
        <div className='buttons'>    
          <button type="submit">Add Visite</button>
          <button type='button' className='Exit' onClick={handleclick}>Exit</button>
        </div>
    </form>
  )
}

export default Visite
