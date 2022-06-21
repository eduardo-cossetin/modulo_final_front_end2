const userName = localStorage.getItem("userLogIn")
const inputDescription = document.querySelector("#inputDescription") as HTMLInputElement
const inputDetail = document.querySelector("#inputDetail") as HTMLInputElement
const inputDescriptionEdit = document.querySelector("#inputDescriptionEdit") as HTMLInputElement
const inputDetailEdit = document.querySelector("#inputDetailEdit") as HTMLInputElement
const buttonSaveMessage = document.querySelector("#buttonSaveMessage") as HTMLButtonElement
const buttonEdit = document.querySelector("#buttonEdit") as HTMLButtonElement
const buttonDelete = document.querySelector("#buttonDelete") as HTMLButtonElement
const buttonLogOut = document.querySelector("#buttonLogOut") as HTMLButtonElement
const table = document.querySelector("#table") as HTMLTableElement
const tr = document.querySelector("#tr") as HTMLElement
const inputsEditar = document.querySelector("#inputsEditar") as HTMLDivElement
const usersMessages: Array<any> = JSON.parse(localStorage.getItem("usersMessages") || "[]")

let recadoUsuario = usersMessages.filter((element) => element.username == userName)

populaLista()

if(userName === ""){
    alert("Usuário não logado")
    window.location.href = "./index.html"
} 

buttonSaveMessage.addEventListener("click", () => {    
    if(inputDescription.value === "" ||  inputDetail.value === ""){
        alert("É necessário preencher os campos!")
    } else {
        const capturarInputs = getInputsMessage()
        const recado =  message(capturarInputs)   
        addMessage(recado)
        populaLista()
        inputDescription.value = ""
        inputDetail.value = ""
    }
})

function getInputsMessage(){
    return {
        description: inputDescription.value,
        detail: inputDetail.value
    }
}

function message (capturarInputs: any){
    return {
        username: userName,
        id: nextId(),
        description: capturarInputs.description,
        detail: capturarInputs.detail
    }
}

function nextId (){    
    let max = 0;
    recadoUsuario.forEach((item) => {
    if (item.id > max) {
      max = item.id;
    }
    });
    return max + 1;
}

function addMessage(recado: any){
    usersMessages.push(recado)
    recadoUsuario.push(recado)
    localStorage.setItem("usersMessages", JSON.stringify(usersMessages))
}

function populaLista(){
    limpaTabela()
    recadoUsuario.forEach((element) => {
        const tr: HTMLElement = document.createElement("tr") 
        table.innerHTML+= `<th scope="row">${element.id}
        </th><td>${element.description}</td><td>${element.detail}
        </td> <td> <button  onclick="editMessage(${element.id})" class="btn btn-success me-2">EDITAR</button><button onclick="deleteMessage(${element.id})"  class="btn btn-danger">APAGAR</button> </td></tr>`;        
    })
}

buttonLogOut.addEventListener("click", () => {
    localStorage.setItem("userLogIn", "")
    window.location.href = "./index.html"
})

function limpaTabela(){
    const linhas = document.querySelectorAll("#table>tbody tr");
    linhas.forEach((linha) => linha.parentNode?.removeChild(linha))    
}

function deleteMessage(id: number){
    const index: number = usersMessages.findIndex((item) => item.id == id && item.username == userName);  
    usersMessages.splice(index, 1); 
    localStorage.setItem("usersMessages", JSON.stringify(usersMessages));
    recadoUsuario = usersMessages.filter((element) => element.username == userName)
    populaLista();
}   

function editMessage(id: number){
    showHideInputsMessages ()    
    const indexEdit: number = usersMessages.findIndex((item) => item.id == id && item.username == userName);    
    buttonEdit.addEventListener("click", () => {   
        adicionarRecadoEdit ()        
        showHideInputsEdit ()        
    })      

    function adicionarRecadoEdit(){
        const inputsEdits = getInputsEdit() 
        usersMessages[indexEdit].description = inputsEdits.description
        usersMessages[indexEdit].detail = inputsEdits.detail
        localStorage.setItem("usersMessages", JSON.stringify(usersMessages));
        populaLista()   
    }
}

function getInputsEdit(){
    return {
        description: inputDescriptionEdit.value,
        detail: inputDetailEdit.value
    }
}

function showHideInputsMessages (){
    inputDescriptionEdit.style.display = "block";
    inputDetailEdit.style.display = "block";
    buttonEdit.style.display = "block";
    inputDescription.style.display = "none" 
    inputDetail.style.display = "none" 
    buttonSaveMessage.style.display = "none" 
}

function showHideInputsEdit (){
    inputDescriptionEdit.style.display = "none";
    inputDetailEdit.style.display = "none";
    buttonEdit.style.display = "none";
    inputDescription.style.display = "block" 
    inputDetail.style.display = "block" 
    buttonSaveMessage.style.display = "block"
}
