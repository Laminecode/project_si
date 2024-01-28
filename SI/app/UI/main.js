
// helper method to get elements from the dom 
function _get_elements(_class)
{
	return document.querySelectorAll(_class);
}
// helper method to get elements from inside other specific elements
function _get_elements_from_elements(elements, _class)
{
	let list = [];
	elements.forEach(e => {list.push(e.querySelectorAll(_class)[0])});
	return list;
}


// getting all the forms and buttons to give them event listeners
let menu_buttons = _get_elements(".new");
let add_forms = _get_elements(".add_form");
let del_forms = _get_elements(".del_form");
let mod_forms = _get_elements(".mod_form");

let exit_add_form_buttons = _get_elements_from_elements(add_forms, ".Exit");
let add_add_form_buttons = _get_elements_from_elements(add_forms, ".add");

let exit_del_form_buttons = _get_elements_from_elements(del_forms, ".Exit");
let add_del_form_buttons = _get_elements_from_elements(del_forms, ".add");

let exit_mod_form_buttons = _get_elements_from_elements(mod_forms, ".Exit");
let add_mod_form_buttons = _get_elements_from_elements(mod_forms, ".add");

let table = document.getElementById("show_sec");
let button_sec = document.getElementById("button_sec");


// list of tiltes for the add del modify buttons section 
let section_names = [
	"Patient", "Medecin",
	"Hospitalisation",
	"Visite",
	"Control",
	"Analyse",
	"Chirurgie",
	"Vaccination",
]

// list of form names with the corresponding view url in backend for adding new objects
let form_names_urls = [
	"add_patient/", "add_patient_form",
	"add_medecin/", "add_medecin_form", 
	"add_hospitalisation/", "add_hospitalisation_form",
	"add_visite/", "add_visite_form",
	"add_control/", "add_control_form",
	"add_analyse/", "add_analyse_form",
	"add_chirurgie/", "add_chirurgie_form",
	"add_vaccination/", "add_vaccination_form",
]

// list of form names with the corresponding view url in backend for deleting existing objects
let del_form_names_urls = [
	"del_patient/", "del_patient_form",
	"del_medecin/", "del_medecin_form", 
	"del_hospitalisation/", "del_hospitalisation_form",
	"del_visite/", "del_visite_form",
	"del_control/", "del_control_form",
	"del_analyse/", "del_analyse_form",
	"del_chirurgie/", "del_chirurgie_form",
	"del_vaccination/", "del_vaccination_form",
]

// list of form names with the corresponding view url in backend for modifying existing objects
let mod_form_names_urls = [
	"mod_patient/", "mod_patient_form",
	"mod_medecin/", "mod_medecin_form", 
	"mod_hospitalisation/", "mod_hospitalisation_form",
	"mod_visite/", "mod_visite_form",
	"mod_control/", "mod_control_form",
	"mod_analyse/", "mod_analyse_form",
	"mod_chirurgie/", "mod_chirurgie_form",
	"mod_vaccination/", "mod_vaccination_form",
]

// list of form view urls in backend for getting all the objects of a model
let get_all_urls = [
	"get_all_patient/", 
	"get_all_medecin/", 
	"get_all_hospitalisation/",
	"get_all_visite/",
	"get_all_control/",
	"get_all_analyse/",
	"get_all_chirurgie/",
	"get_all_vaccination/",
]

// list of header names for the table whan showing the data of each model
let headers = [
	["id", "nom", "prenom", "date_naissance", "sexe", "information"],
	["id", "nom", "prenom", "specialite"],
	["id", "duree", "resultat", "medecin", "patient", "date", "fait"],
	["id", "resultat", "medecin", "patient", "date", "fait"],
	["id", "resultat", "medecin", "patient", "date", "fait"],
	["id", "type", "resultat", "medecin", "patient", "date", "fait"],
	["id", "heure", "minute", "detail", "medecin", "patient", "date", "fait"],
	["id", "nom", "type", "medecin", "patient", "date", "fait"],
];

// helper funcion to send a request to a given url, send data in the body of the request ...
// ... and retrun the data returned in the body of the response

// this function sends the url to the backend using Port 8000 !!!
// so make sure the server in launched in that port
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

// helper function that takes a form name, and collects and returns all the input data in the form
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


// event handler for add buttons to show the form
function handleClick(form){
    form.classList.add("form")
    form.classList.remove('hidden')
}

// event handler for exit buttons to hide the form
function handleClick2(form){
    form.classList.add("hidden")
    form.classList.remove('form')
}

// event handler that shows the main section (data table and manegment buttons : add, del...) of a given model
function toggle_show_and_button_sec(i)
{
	empty_button_sec();
	generate_buttons(section_names[i], add_forms[i], del_forms[i], mod_forms[i]);
	// console.log(add_forms[i]);
	show_data(get_all(get_all_urls[i]), headers[i]);
	// console.log(headers[i]);
}

// event handler for creaeting new object for a model
function submit_add(url, form_name)
{
	// console.log("test 123");
	data = collect_form_data(form_name);
	// console.log(data);
	request(url, data);
}

// event handler for getting all object of a model
function get_all(url)
{
	data = request(url, {});
		// console.log(data);
	return data;
}

// helper function to add event handler to all elements in list
function _add_event_to_buttons(list, event, callback)
{
	for (let i = 0; i < list.length; i++)
	{
		list[i].addEventListener(event, function(){callback(i)});
	}
}


// adding event handlers to buttons

// for (let i = 0 ;i<menu_buttons.length;i++){
//     menu_buttons[i].addEventListener('click',function(){toggle_show_and_button_sec(i)});
// 	menu_buttons[i].addEventListener('click', function(){get_all(get_all_urls[i])});
// }
_add_event_to_buttons(menu_buttons, "click", function(i){toggle_show_and_button_sec(i)});
_add_event_to_buttons(menu_buttons, "click", function(i){get_all(get_all_urls[i])});



for (let i = 0 ;i<add_forms.length;i++){
    add_forms[i].addEventListener('submit',function(e){e.preventDefault()})
	del_forms[i].addEventListener('submit',function(e){e.preventDefault()})
	mod_forms[i].addEventListener('submit',function(e){e.preventDefault()})
	
}
// _add_event_to_buttons(add_forms, "submit", function(e){e.preventDefault()});

// for (let i = 0 ;i<exit_add_form_buttons.length;i++){
//     exit_add_form_buttons[i].addEventListener('click',function(){handleClick2(add_forms[i])})
// }

_add_event_to_buttons(exit_add_form_buttons, "click", function(i){handleClick2(add_forms[i])});


// for (let i=0; i<add_add_form_buttons.length; i++)
// {
// 	add_add_form_buttons[i].addEventListener("click", function(){submit_add(form_names_urls[i*2], form_names_urls[i*2 + 1])})
// }
_add_event_to_buttons(add_add_form_buttons, "click", function(i){submit_add(form_names_urls[i*2], form_names_urls[i*2 + 1])});

_add_event_to_buttons(exit_del_form_buttons, "click", function(i){handleClick2(del_forms[i])});
_add_event_to_buttons(add_del_form_buttons, "click", function(i){submit_add(del_form_names_urls[i*2], del_form_names_urls[i*2 + 1])})

_add_event_to_buttons(exit_mod_form_buttons, "click", function(i){handleClick2(mod_forms[i])});
_add_event_to_buttons(add_mod_form_buttons, "click", function(i){submit_add(mod_form_names_urls[i*2], mod_form_names_urls[i*2 + 1])})



// method to create the header of the table for showing the data
function create_header_list(headers)
{
	header_entry_width = (100 / headers.length).toString() + "%";
	// console.log(header_entry_width);
	let header = document.createElement("div");
	header.classList.add("table_line");

	for (let i = 0; i< headers.length; i++)
	{
		let header_entry = document.createElement("div");
		header_entry.classList.add("table_entry");
		header_entry.style.width = header_entry_width;
		header_entry.textContent = headers[i];
		header.appendChild(header_entry);
	}
	document.getElementById("show_sec").appendChild(header);
}

// method to create the cell of the table 
function create_data_entry(value, width)
{
	let entry = document.createElement("div");
	entry.classList.add("table_entry");
	entry.style.width = width;
	if (typeof value === "object")
	{
		for (const _value of Object.values(value))
		{
			entry.textContent += _value.toString() + ", ";
		}
	}
	else
	{
		entry.textContent = value;
	}
	return entry;
}

// method to delete all previous data in talbe
function empty_table()
{
	while (table.firstChild)
	{
		table.removeChild(table.firstChild);
	}
}

// method to create a single line in the table
function create_data_list(data, header)
{

	let header_entry_width = (100 / header.length).toString() + "%";
	
	// console.log(data);
	data.then(function(data){
		for (const element of Object.values(data))
		{
			let line = document.createElement("div");
			line.classList.add("table_line");
			for (let i = 0; i<header.length; i++)
			{
				let key = header[i];
				let value = element[key];
				line.appendChild(create_data_entry(value, header_entry_width));
			}
			table.appendChild(line);
		}
	});
}


// handler to get the data and show it the table when the menu buttons are pressed
function show_data(data, header)
{
	empty_table();
	create_header_list(header);
	create_data_list(data, header);
}

function empty_button_sec()
{
	while (button_sec.firstChild)
	{
		button_sec.removeChild(button_sec.firstChild);
	}
}
function generate_buttons(section_name, form_name, del_form_name, mod_form_name)
{
	empty_button_sec();

	let sec_name = document.createElement("div");
	button_sec.appendChild(sec_name);
	sec_name.textContent = section_name;
	sec_name.classList.add("sec_button_name");

	let add_button = document.createElement("button");
	button_sec.appendChild(add_button);
	add_button.textContent = "Ajouter";
	add_button.addEventListener("click", function(){handleClick(form_name)});

	let mod_button = document.createElement("button");
	button_sec.appendChild(mod_button);
	mod_button.textContent = "Modifier";
	mod_button.addEventListener("click", function(){handleClick(mod_form_name)});


	let del_button = document.createElement("button");
	button_sec.appendChild(del_button);
	del_button.textContent = "Supprimer";
	del_button.addEventListener("click", function(){handleClick(del_form_name)});
	
}




// generate_buttons(forms[0]);
// show_data(get_all("get_all_patient/"), headers);