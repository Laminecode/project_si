async function request(url, data)
{
	res = await fetch("http://localhost:8000/app/"+url,
	{
		method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data)
	});
	res = await res.json();
	return res;

}

function collect_form_data(form_name)
{
	input_values = {};
	form = document.getElementById(form_name);
	console.log(form);
	let input_elements = form.querySelectorAll("input");
	input_elements.forEach(element => {	
		value = null;
		if (element.type === "checkbox")
		{
			value = element.checked;
		}
		else 
		{
			value = element.value ; 
		}
		input_values[element.name] = value;
	});
	
	let select_elements = form.querySelectorAll("select");
	select_elements.forEach(element => {
		input_values[element.name] = element.value;
	});

	let textarea_elements = form.querySelectorAll("textarea");
	textarea_elements.forEach(element => {
		input_values[element.name] = element.value;
	});
	
	// for (let i = 0; i < select_elements.length; i++)
	// {
	// 	const childElement = select_elements[i];	 
	// 	input_values[childElement.name] = childElement.value;
	// }
	return input_values;
}


function submit_add_patient()
{
	res = collect_form_data("add_patient_form");
	console.log(res);

	request("add_patient/", res).then(function(res){
		console.log(res);
	})
}


function initialization()
{
	document.getElementById("submit_add_patient").addEventListener("click", submit_add_patient.bind);
}

// 
window.onload = initialization;