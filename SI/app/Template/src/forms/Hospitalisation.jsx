import React from 'react'

function Hospitalisation() {
  function handleclick(){
    let form = document.querySelector('.Hospitalisation')
    form.style.display = 'none';
  }
  return (
    <form method="post" className='Hosipitalisation'>
        <p>Hospitalisation</p>
        <label htmlFor="duree">Durée:</label>
        <input type="text" id="duree" name="duree" required/>
        <label htmlFor="record">Record ID:</label>
        <input type="text" id="record" name="record"  required/>
        <label htmlFor="medecin">Médecin ID:</label>
        <input type="text" id="medecin" name="medecin"  required/>
        <label htmlFor="result">Résultat:</label>
        <textarea id="result" name="result" required></textarea>
        <div className="buttons">
          <button type="submit">Add Hopitalisation</button>
          <button type='button' className='Exit' onClick={handleclick}>Exit</button>
        </div>
    </form>
  )
}

export default Hospitalisation
