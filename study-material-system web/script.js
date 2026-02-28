function login(){

let name=document.getElementById("name").value
let dept=document.getElementById("department").value
let role=document.getElementById("role").value
let password=document.getElementById("password").value

const studentPassword="student123"

const facultyPasswords={
CSE:"cse123",
IT:"it123",
ECE:"ece123",
MECH:"mech123",
AIDS:"aids123"
}

if(role==="student" && password!==studentPassword){
alert("Invalid Student Password")
return
}

if(role==="faculty" && password!==facultyPasswords[dept]){
alert("Invalid Faculty Password")
return
}

localStorage.setItem("name",name)
localStorage.setItem("dept",dept)
localStorage.setItem("role",role)

window.location="dashboard.html"

}



if(document.getElementById("welcome")){

let name=localStorage.getItem("name")
let role=localStorage.getItem("role")

document.getElementById("welcome").innerText="Welcome "+name+" ("+role+")"

if(role==="student"){
document.getElementById("uploadBtn").style.display="none"
}

}



function openMaterials(){
window.location="materials.html"
}

function openUpload(){
window.location="upload.html"
}

function logout(){
localStorage.clear()
window.location="index.html"
}



function uploadMaterial(){

let subject=document.getElementById("subject").value
let type=document.getElementById("type").value
let file=document.getElementById("file").files[0]
let link=document.getElementById("link").value
let dept=localStorage.getItem("dept")

if(!file && link===""){
window.location="success.html?type=upload&status=fail"
return
}

let materials=JSON.parse(localStorage.getItem("materials"))||[]

if(file){

let reader=new FileReader()

reader.onload=function(e){

materials.push({
subject:subject,
type:type,
dept:dept,
data:e.target.result,
name:file.name
})

localStorage.setItem("materials",JSON.stringify(materials))

window.location="success.html?type=upload&status=success"

}

reader.readAsDataURL(file)

}

else{

materials.push({
subject:subject,
type:type,
dept:dept,
data:link,
name:"link"
})

localStorage.setItem("materials",JSON.stringify(materials))

window.location="success.html?type=upload&status=success"

}

}



if(document.getElementById("materialsTable")){

let materials=JSON.parse(localStorage.getItem("materials"))||[]
let dept=localStorage.getItem("dept")
let role=localStorage.getItem("role")

let table=document.getElementById("materialsTable")

materials.forEach(function(item,index){

if(item.dept===dept){

let row=table.insertRow()

row.insertCell(0).innerText=item.subject
row.insertCell(1).innerText=item.type
row.insertCell(2).innerText=item.dept

let download=row.insertCell(3)

download.innerHTML="<button onclick='downloadMaterial("+index+")'>Download</button>"

let del=row.insertCell(4)

if(role==="faculty"){
del.innerHTML="<button onclick='deleteMaterial("+index+")'>Delete</button>"
}else{
del.innerHTML="Not Allowed"
}

}

})

}



function downloadMaterial(index){

let materials=JSON.parse(localStorage.getItem("materials"))||[]
let item=materials[index]

if(!item){
window.location="success.html?type=download&status=fail"
return
}

if(item.name==="link"){
window.open(item.data,"_blank")
window.location="success.html?type=download&status=success"
return
}

let a=document.createElement("a")
a.href=item.data
a.download=item.name
a.click()

window.location="success.html?type=download&status=success"

}



function deleteMaterial(index){

let materials=JSON.parse(localStorage.getItem("materials"))||[]

materials.splice(index,1)

localStorage.setItem("materials",JSON.stringify(materials))

location.reload()

}



const params=new URLSearchParams(window.location.search)

const type=params.get("type")
const status=params.get("status")

const msg=document.getElementById("msg")
const extra=document.getElementById("extra")

if(msg){

if(status==="success" && type==="download"){
msg.innerText="Successfully Downloaded"
extra.innerText="Thank you. Visit Again To Get More Materials."
}

else if(status==="success" && type==="upload"){
msg.innerText="Successfully Uploaded"
extra.innerText="Thank you. Visit Again To Get More Materials."
}

else if(status==="fail" && type==="download"){
msg.innerText="Download Failed. Try Again."
}

else if(status==="fail" && type==="upload"){
msg.innerText="Upload Failed. Try Again."
}

else{
msg.innerText="Thank You"
extra.innerText="Visit Again To Get More Materials."
}

}