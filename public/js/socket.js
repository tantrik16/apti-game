!function(){var e=["A","B","C","D"],t=io.connect(),n=document.getElementById("button")
n.addEventListener("click",function(){t.emit("number","start"),document.getElementById("result").innerHTML="",document.getElementById("button").innerHTML="Next Question"}),t.on("number",function(t){document.getElementById("game").innerHTML="<h2>"+t.question+"<h2>"
for(var n=0;4>n;n++)document.getElementById("opt"+(n+1)).style.display="block",document.getElementById(e[n]).innerHTML=t[e[n]]})
var o=document.getElementById("submit")
o.addEventListener("click",function(){for(var n=0,o=0;4>o;o++)if(document.getElementsByName("Q")[o].checked){n=e[o],document.getElementsByName("Q")[o].checked=!1
break}return 1!=n.length||0==n?void(document.getElementById("result").innerHTML="<h2> Please Select An Option </h2>"):void t.emit("answer",n)}),t.on("answer",function(e){document.getElementById("result").innerHTML="<h2>"+e+"</h2>"}),t.on("streak",function(e){isNaN(e)||(document.getElementById("streak").innerHTML="Your Streak : "+e)}),t.on("streakhigh",function(e){isNaN(e)||(document.getElementById("streakhigh").innerHTML="Highest Streak : "+e)})}()
