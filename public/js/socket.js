!function(){var e=["A","B","C","D"],t=io.connect(),n=document.getElementById("button")
n.addEventListener("click",function(){t.emit("number","start"),document.getElementById("button").innerHTML="Next Question"}),t.on("number",function(t){document.getElementById("game").innerHTML="<h2>"+t.question+"<h2>"
for(var n=0;4>n;n++)document.getElementById("opt"+(n+1)).style.display="block",document.getElementById(e[n]).innerHTML=t[e[n]], document.getElementById('result').innerHTML = ''})
var o=document.getElementById("submit")
o.addEventListener("click",function(){for(var n=0,o=0;4>o;o++)if(document.getElementsByName("Q")[o].checked){n=e[o],document.getElementsByName("Q")[o].checked=!1
break}return 1!=n.length||0==n?void(document.getElementById("result").innerHTML="<h2> Please Select An Option </h2>"):void t.emit("answer",n)}),t.on("streak",function(e){isNaN(e)||(document.getElementById("streak").innerHTML="Your Streak : "+e)}),t.on("streakhigh",function(e){isNaN(e)||(document.getElementById("streakhigh").innerHTML="Highest Streak : "+e)})
var a = document.getElementById('addbtn');
a.addEventListener('click', function (){
    if(document.getElementById('console').style.display == 'block'){
        document.getElementById('console').style.display = 'none';
        document.getElementById('addConsole').style.display = 'block';
        this.innerHTML = 'Resume Game!';
    }
    else{
        document.getElementById('console').style.display = 'block';
        document.getElementById('addConsole').style.display = 'none';
        this.innerHTML = 'Add a Question!';
    }
});
var b = document.getElementById('submit1');
b.addEventListener('click', function (){
    var flag = true;
    var error = [];
    var ids = ['Question', 'optA', 'optB', 'optC', 'optD', 'Cans'];
    var value = [];
    for(var i = 0; i < 5; i++){
        value = value.concat(document.getElementById(ids[i]).value);        
    }
    if(value[0].length < 5){
        flag = false;
        error = error.concat('Question Appears to be Too Short!');
        document.getElementById(ids[0]).style.borderColor = "red";
        document.getElementById(ids[0]).style.borderWidth = "1px";
    }
    
    for(var i = 0; i < 5; i++){
        value[i] = html_sanitize(value[i]);
        if(value[i].indexOf('$') != -1 ){
            error = error.concat('Do Not use $ symbol!')
            document.getElementById(ids[i]).style.borderColor = "red";
            document.getElementById(ids[i]).style.borderWidth = "1px";
            flag = false;
        }
    }
    for(var i = 1; i < 5; i++){
        if(value[i].length == 0){
            error = error.concat('Do Not leave option empty!')
            document.getElementById(ids[i]).style.borderColor = "red";
            document.getElementById(ids[i]).style.borderWidth = "1px";
            flag = false;
        }
    }
    var ans = document.getElementById('Cans');
    var ans = ans.options[ans.selectedIndex].value;
    if(ans != 'A' && ans != 'B' && ans != 'C' && ans != 'D')
        flag = false;
    
    value = value.concat(ans.toString());
    
    if(flag){
        console.log(value);
        document.getElementById('valid').innerHTML = 'Authenticated! Sending Question to server.';
        t.emit('question', value);
        t.on('entered', function (data){
            document.getElementById('valid').innerHTML = data;
            for(var i = 0; i < 5; i++){
                document.getElementById(ids[i]).value = '';    
                document.getElementById(ids[i]).style.borderColor = "white";    
            }
        });
    }
    else{
        document.getElementById('valid').innerHTML = error[0];
    }

});
}()