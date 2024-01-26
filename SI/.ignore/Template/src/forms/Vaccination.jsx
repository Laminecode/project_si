import React from 'react'

function Vaccination() {
  function handleclick(){
    let form = document.querySelector('.Vaccination')
    form.style.display = 'none';
  }
  return (
    <form method="post" className='Vaccination'>
        <p>Vaccination</p>
        <label htmlFor="nom">Nom:</label>
        <input type="text" id="nom" name="nom" required/>
        <label htmlFor="type">Type:</label>
        <input type="text" id="type" name="type" required/>
        <label htmlFor="record">Record ID:</label>
        <input type="text" id="record" name="record" required/>
        <label htmlFor="medecin">Médecin ID:</label>
        <input type="text" id="medecin" name="medecin" required/>
        <div className='buttons'>
          <button type="submit">Add Vaccination</button>
          <button type='button' className='Exit' onClick={handleclick}>Exit</button>
        </div>
    </form>
  )
}
export default Vaccination
