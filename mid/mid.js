data=[
  
];

window.onload = init;

ID = 1;
NAME = 1;
PRICE = 1;


function init(){
document.querySelector("#save").onclick =savetable;
document.querySelector("#idbu").onclick =arrayid;
document.querySelector("#nmbu").onclick =arrayname;
document.querySelector("#prbu").onclick =arrayprice;

showarray();
}

function savetable(){
ItsName = document.querySelector("#nm").value;
ItsPrice = document.querySelector("#pr").value;

let contact = new Object();
contact.ID = data.length+1;
contact.NAME = ItsName;
contact.PRICE = ItsPrice;

data.push(contact);

document.getElementById('nm').value = "";
document.getElementById('pr').value = "";

showarray();
}

function arrayid(){
if(ID == 1){
    ID = 0;
    data.sort(function(a, b){return b.ID - a.ID});
}else{
    ID = 1;
    data.sort(function(a, b){return a.ID - b.ID});
}
showarray();
}

function arrayname(){
if(NAME == 1){
    NAME = 0;
    data.sort(function(a, b){
        var x = a.NAME.toLowerCase();
        var y = b.NAME.toLowerCase();
        if (x < y) {return -1;}
        if (x > y) {return 1;}
        return 0;
    });
}else{
    NAME = 1;
    data.sort(function(a, b){
        var x = b.NAME.toLowerCase();
        var y = a.NAME.toLowerCase();
        if (x < y) {return -1;}
        if (x > y) {return 1;}
        return 0;
    });
}
showarray();
}

function arrayprice(){
if(PRICE == 1){
    PRICE = 0;
    data.sort(function(a, b){return a.PRICE - b.PRICE});
}else{
    PRICE = 1;
    data.sort(function(a, b){return b.PRICE - a.PRICE});
}
showarray();
}

function showarray(){
tb = document.querySelector("#mytable");
tb.innerHTML = "";

for (i = 0; i < data.length; i++) {
    mtr = document.createElement("tr");

    td1 = document.createElement("td");
    td2 = document.createElement("td");
    td3 = document.createElement("td");
    input1 = document.createElement("input");
    input2 = document.createElement("input");
    
    td1.innerText = data[i].ID;

    input1.value = data[i].NAME;
    input2.value = data[i].PRICE;
    td2.append(input1);
    td3.append(input2);

    mtr.append(td1);
    mtr.append(td2);
    mtr.append(td3); 

    tb.append(mtr);
}
}

function editarray(){
for(i = 0; i < data.length; i++){
    nameNode = document.querySelector(
        "#mytable tr:nth-child("+(i+1)+") td:nth-child(2) input");
    priceNode = document.querySelector(
        "#mytable tr:nth-child("+(i+1)+") td:nth-child(3) input");

    data[i].NAME = nameNode.value;
    data[i].PRICE = priceNode.value;
}
}

function whatKey(event){
if(event.keyCode == 13){
    editarray();
}
if(event.keyCode == 27){
    showarray();
}
}
