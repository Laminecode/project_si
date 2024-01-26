
function test()
{
	console.log(1);
	fetch("http://localhost:8000/app/test/")
	.then(function(response){
		console.log(2);
	});
	console.log(3);
}


function initialization()
{
    document.getElementById('test').addEventListener('click', test);
}


// on page load
window.onload = initialization;