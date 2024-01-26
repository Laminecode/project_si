import React from 'react'
function Control() {
  function handleclick(){
    let form = document.querySelector('.Control')
    form.style.display = 'none';
  }
  return (
    <form method="post" className='Control'>
        <p>Control</p>
        <label htmlFor="record">Record ID:</label>
        <input type="text" id="record" name="record"  required/>
        <label htmlFor="medecin">Médecin ID:</label>
        <input type="text" id="medecin" name="medecin"  required/>
        <label htmlFor="result">Résultat:</label>
        <textarea id="result" name="result" required></textarea>
        <div className="buttons">
          <button type="submit">Add Control</button>
          <button type='button' className='Exit' onClick={handleclick}>Exit</button>
        </div>
    </form>
  )
}

export default Control
