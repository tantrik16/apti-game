!function(){var e=["A","B","C","D"],t=io.connect(),n=document.getElementById("button")
n.addEventListener("click",function(){document.getElementById('instructions').style.display = 'none',t.emit("number","start"),document.getElementById("button").innerHTML="Next Question", document.getElementById("game").innerHTML="",document.getElementById("loading").innerHTML="<h2> Fetching the Question.... </h2>"}, document.getElementById('options').style.display = 'none'),t.on("number",function(t){document.getElementById('options').style.display = 'block',document.getElementById("loading").innerHTML= "",document.getElementById("game").innerHTML="<h2>"+t.question+"<h2>"
for(var n=0;4>n;n++)document.getElementById("opt"+(n+1)).style.display="block",document.getElementById(e[n]).innerHTML=t[e[n]],document.getElementById("result").innerHTML=""})
var o=document.getElementById("submit")
o.addEventListener("click",function(){for(var n=0,o=0;4>o;o++)if(document.getElementsByName("Q")[o].checked){n=e[o],document.getElementsByName("Q")[o].checked=!1
break}return 1!=n.length||0==n?void(document.getElementById("result").innerHTML="<h2> Please Select An Option </h2>"):void t.emit("answer",n)}),t.on("streak",function(e){isNaN(e)||(document.getElementById("streak").innerHTML="Your Streak : "+e)}),t.on("streakhigh",function(e){isNaN(e)||(document.getElementById("streakhigh").innerHTML="Highest Streak : "+e)})
var d=document.getElementById("addbtn")
d.addEventListener("click",function(){if(document.getElementById("console").style.display=="block"){document.getElementById("console").style.display="none"
document.getElementById("addConsole").style.display="block"
this.innerHTML="Resume Game!"
document.getElementById('valid').innerHTML = ""
o=["Question","optA","optB","optC","optD","Cans"]
for(var t=0;t<5;t++){document.getElementById(o[t]).value=""
document.getElementById(o[t]).style.borderColor="white"}
}else{document.getElementById("console").style.display="block"
document.getElementById("addConsole").style.display="none"
this.innerHTML="Add a Question!"}})
var l=document.getElementById("submit1")
l.addEventListener("click",function(){var e=true
var n=[]
var o=["Question","optA","optB","optC","optD","Cans"];
var d=[]
for(var l=0;l<5;l++){d=d.concat(document.getElementById(o[l]).value.trim())}if(d[0].length<5){e=false
n=n.concat("Question Appears to be Too Short!")
document.getElementById(o[0]).style.borderColor="red"
document.getElementById(o[0]).style.borderWidth="1px"}for(var l=0;l<5;l++){d[l]=html_sanitize(d[l])
if(d[l].indexOf("$")!=-1){n=n.concat("Do Not use $ symbol!")
document.getElementById(o[l]).style.borderColor="red"
document.getElementById(o[l]).style.borderWidth="1px"
e=false}}for(var l=1;l<5;l++){if(d[l].length==0){n=n.concat("Do Not leave option empty!")
document.getElementById(o[l]).style.borderColor="red"
document.getElementById(o[l]).style.borderWidth="1px"
e=false}}var r=document.getElementById("Cans")
var r=r.options[r.selectedIndex].value
if(r!="A"&&r!="B"&&r!="C"&&r!="D")e=false
d=d.concat(r.toString())
if(e){console.log(d)
document.getElementById("valid").innerHTML="Authenticated! Sending Question to server."
t.emit("question",d)
t.on("entered",function(e){document.getElementById("valid").innerHTML=e
for(var t=0;t<5;t++){document.getElementById(o[t]).value=""
document.getElementById(o[t]).style.borderColor="white"}})}else{document.getElementById("valid").innerHTML=n[0]}})

}()