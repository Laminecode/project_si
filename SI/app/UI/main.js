let buttons = document.querySelectorAll(".new")
let forms = document.querySelectorAll("form")
let Exits = document.querySelectorAll(".Exit")
let urls = {
    "add_patient_form" : "add_patient/",
    
}


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

function submit_add(url, form_name)
{

}

console.log(forms)
console.log(buttons)
function handleClick(form){
    form.classList.add("form")
    form.classList.remove('hidden')
}

function handleClick2(form){
    form.classList.add("hidden")
    form.classList.remove('form')
}

for (let i = 0 ;i<buttons.length;i++){
    buttons[i].addEventListener('click',function(){handleClick(forms[i])})
}

for (let i = 0 ;i<Exits.length;i++){
    Exits[i].addEventListener('click',function(){handleClick2(forms[i])})
}