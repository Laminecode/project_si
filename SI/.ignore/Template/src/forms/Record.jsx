import React from 'react';
 
function Record() {
  function handleclick(){
    let form = document.querySelector('.Record')
    form.style.display = 'none';
  }
  return (
    <form method="post" className='Record'>
      <p>Record</p>
      <label htmlFor="id_r">ID:</label>
      <input type="text" id="id_r" name="id_r" required />
      <label htmlFor="type">Type:</label>
      <input type="number" id="type" name="type" required />
      <label htmlFor="fait">Fait:</label>
      <input type="checkbox" id="fait" name="fait" value="isChecked" />
      <div className="buttons">
        <button type="submit">Add Record</button>
        <button type='button' className='Exit' onClick={handleclick}>Exit</button>
      </div>
     
    </form>
  );
}

export default Record;

