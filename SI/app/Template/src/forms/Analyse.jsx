import React from 'react'

function Analyse() {
  function handleclick(){
    let form = document.querySelector('.Analyse')
    form.style.display = 'none';
  }
  return (
    <form method="post" className='Analyse'>
        <p>Analyse</p>
        <label htmlFor="type">Type:</label>
        <input type="text" id="type" name="type" required/>
        <label htmlFor="record">Record ID:</label>
        <input type="text" id="record" name="record" required/>
        <label htmlFor="medecin">Médecin ID:</label>
        <input type="text" id="medecin" name="medecin" required/>
        <label htmlFor="result">Résultat:</label>
        <textarea id="result" name="result" required></textarea>
        <div className="buttons">
          <button type="submit">Add Analyse</button>
          <button type='button' className='Exit' onClick={handleclick}>Exit</button>
        </div>
    </form>
  )
}

export default Analyse
