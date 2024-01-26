import React from 'react'

function Chirugie() {
  function handleclick(){
    let form = document.querySelector('.Chirugie')
    form.style.display = 'none';
  }
  return (
    <form method="post" className='Chirugie'>
        <p>Chirugie</p>
        <label htmlFor="duree">Durée:</label>
        <input type="text" id="duree" name="duree" required/>
        <label htmlFor="record">Record ID:</label>
        <input type="text" id="record" name="record" required/>
        <label htmlFor="medecin">Médecin ID:</label>
        <input type="text" id="medecin" name="medecin" required/>
        <label htmlFor="detail">Détail:</label>
        <textarea id="detail" name="detail" required></textarea>
        <div className='buttons'>
          <button type="submit">Add Chirugie</button>
          <button type='button' className='Exit' onClick={handleclick}>Exit</button>
        </div>
    </form>
  )
}

export default Chirugie
