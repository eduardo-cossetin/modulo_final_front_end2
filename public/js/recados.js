"use strict";
const userName = localStorage.getItem("userLogIn");
const inputDescription = document.querySelector("#inputDescription");
const inputDetail = document.querySelector("#inputDetail");
let inputDescriptionEdit = document.querySelector("#inputDescriptionEdit");
let inputDetailEdit = document.querySelector("#inputDetailEdit");
const buttonSaveMessage = document.querySelector("#buttonSaveMessage");
const buttonEdit = document.querySelector("#buttonEdit");
const buttonDelete = document.querySelector("#buttonDelete");
const buttonLogOut = document.querySelector("#buttonLogOut");
const table = document.querySelector("#table");
const tr = document.querySelector("#tr");
const inputsEditar = document.querySelector("#inputsEditar");
const usersMessages = JSON.parse(localStorage.getItem("usersMessages") || "[]");
populaLista();
if (userName === "") {
    alert("Usuário não logado");
    window.location.href = "./index.html";
}
buttonSaveMessage.addEventListener("click", () => {
    const capturarInputs = getInputsMessage();
    const recado = message(capturarInputs);
    addMessage(recado);
    populaLista();
});
function getInputsMessage() {
    return {
        description: inputDescription.value,
        detail: inputDetail.value
    };
}
function message(capturarInputs) {
    return {
        username: userName,
        id: nextId(),
        description: capturarInputs.description,
        detail: capturarInputs.detail
    };
}
function nextId() {
    let max = 0;
    usersMessages.forEach((item) => {
        if (item.id > max) {
            max = item.id;
        }
    });
    return max + 1;
}
function addMessage(recado) {
    usersMessages.push(recado);
    localStorage.setItem("usersMessages", JSON.stringify(usersMessages));
}
function populaLista() {
    const usersMessages = JSON.parse(localStorage.getItem("usersMessages") || "[]");
    limpaTabela();
    usersMessages.forEach((element) => {
        // const tr: HTMLElement = document.createElement("tr") 
        table.innerHTML += "<th scope=\"row\">" + element.id +
            "</th><td>" + element.description +
            "</td><td>" + element.detail +
            "</td> <td> <button  onclick=\"editMessage()\" class=\"btn btn-success me-2\">EDITAR</button><button onclick=\"deleteMessage()\"  class=\"btn btn-danger\">APAGAR</button> </td></tr>";
    });
}
buttonLogOut.addEventListener("click", () => {
    localStorage.setItem("userLogIn", "");
    window.location.href = "./index.html";
});
function limpaTabela() {
    const linhas = document.querySelectorAll("#table>tbody tr");
    linhas.forEach((linha) => linha.parentNode?.removeChild(linha));
}
function deleteMessage(id) {
    const index = usersMessages.findIndex((item) => item.id == id);
    usersMessages.splice(index, 1);
    localStorage.setItem("usersMessages", JSON.stringify(usersMessages));
    populaLista();
}
function editMessage(id) {
    inputDescriptionEdit.style.display = "block";
    inputDetailEdit.style.display = "block";
    buttonEdit.style.display = "block";
    inputDescription.style.display = "none";
    inputDetail.style.display = "none";
    buttonSaveMessage.style.display = "none";
    // const recado =  addMessageEdit(id) 
    const indexEdit = usersMessages.findIndex((item) => item.id == id);
    console.log(indexEdit);
    buttonEdit.addEventListener("click", () => {
        // const recado =  addMessageEdit(id) 
        populaLista();
        excluirRecado();
        adicionarRecadoEdit();
        inputDescriptionEdit.style.display = "none";
        inputDetailEdit.style.display = "none";
        buttonEdit.style.display = "none";
        inputDescription.style.display = "block";
        inputDetail.style.display = "block";
        buttonSaveMessage.style.display = "block";
    });
    function excluirRecado() {
        usersMessages.splice(indexEdit, 1);
        localStorage.setItem("usersMessages", JSON.stringify(usersMessages));
    }
    function adicionarRecadoEdit() {
        console.log(usersMessages);
        const inputsEdits = getInputsEdit();
        const recado = {
            userName: userName,
            id: indexEdit,
            description: inputsEdits.description,
            detail: inputsEdits.detail
        };
        usersMessages.splice(0, 0, recado);
        console.log(usersMessages);
        localStorage.setItem("usersMessages", JSON.stringify(usersMessages));
        populaLista();
    }
}
function getInputsEdit() {
    return {
        description: inputDescriptionEdit.value,
        detail: inputDetailEdit.value
    };
}