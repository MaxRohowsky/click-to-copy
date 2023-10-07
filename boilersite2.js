var script = document.createElement('script');
script.src = 'https://code.jquery.com/jquery-3.6.3.min.js'; // Check https://jquery.com/ for the current version
document.getElementsByTagName('head')[0].appendChild(script);

$(document).on("mouseover",function(e){
  console.log("$(e.target).attr('id')"); // i just retrieved the id for a demo
});


var $code = document.getElementById('code');

$code.innerText = "hi"