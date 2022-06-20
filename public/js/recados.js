"use strict";
const userName = localStorage.getItem("userLogIn");
const inputDescription = document.querySelector("#inputDescription");
const inputDetail = document.querySelector("#inputDetail");
const inputDescriptionEdit = document.querySelector("#inputDescriptionEdit");
const inputDetailEdit = document.querySelector("#inputDetailEdit");
const buttonSaveMessage = document.querySelector("#buttonSaveMessage");
const buttonEdit = document.querySelector("#buttonEdit");
const buttonDelete = document.querySelector("#buttonDelete");
const buttonLogOut = document.querySelector("#buttonLogOut");
const table = document.querySelector("#table");
const tr = document.querySelector("#tr");
const inputsEditar = document.querySelector("#inputsEditar");
const usersMessages = JSON.parse(localStorage.getItem("usersMessages") || "[]");
const logadoMessage = usersMessages.filter((element) => element.username === userName);
populaLista();
if (userName === "") {
    alert("Usuário não logado");
    window.location.href = "./index.html";
}
buttonSaveMessage.addEventListener("click", () => {
    if (inputDescription.value === "" || inputDetail.value === "") {
        alert("É necessário preencher os campos!");
    }
    else {
        const capturarInputs = getInputsMessage();
        const recado = message(capturarInputs);
        addMessage(recado);
        populaLista();
        inputDescription.value = "";
        inputDetail.value = "";
    }
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
    logadoMessage.forEach((item) => {
        if (item.id > max) {
            max = item.id;
        }
    });
    return max + 1;
}
function addMessage(recado) {
    logadoMessage.push(recado);
    localStorage.setItem("usersMessages", JSON.stringify(usersMessages));
}
function populaLista() {
    limpaTabela();
    logadoMessage.forEach((element) => {
        const tr = document.createElement("tr");
        table.innerHTML += `<th scope="row">${element.id}
        </th><td>${element.description}</td><td>${element.detail}
        </td> <td> <button  onclick="editMessage(${element.id})" class="btn btn-success me-2">EDITAR</button><button onclick="deleteMessage(${element.id})"  class="btn btn-danger">APAGAR</button> </td></tr>`;
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
    const index = logadoMessage.findIndex((item) => item.id == id);
    logadoMessage.splice(index, 1);
    localStorage.setItem("usersMessages", JSON.stringify(logadoMessage));
    populaLista();
}
function editMessage(id) {
    inputDescriptionEdit.style.display = "block";
    inputDetailEdit.style.display = "block";
    buttonEdit.style.display = "block";
    inputDescription.style.display = "none";
    inputDetail.style.display = "none";
    buttonSaveMessage.style.display = "none";
    const indexEdit = logadoMessage.findIndex((item) => item.id == id);
    buttonEdit.addEventListener("click", () => {
        populaLista();
        excluirRecado();
        adicionarRecadoEdit();
        inputDescriptionEdit.value = "";
        inputDetailEdit.value = "";
        inputDescriptionEdit.style.display = "none";
        inputDetailEdit.style.display = "none";
        buttonEdit.style.display = "none";
        inputDescription.style.display = "block";
        inputDetail.style.display = "block";
        buttonSaveMessage.style.display = "block";
    });
    function excluirRecado() {
        logadoMessage.splice(indexEdit, 1);
        localStorage.setItem("usersMessages", JSON.stringify(logadoMessage));
    }
    function adicionarRecadoEdit() {
        const inputsEdits = getInputsEdit();
        const recado = {
            userName: userName,
            id: indexEdit + 1,
            description: inputsEdits.description,
            detail: inputsEdits.detail
        };
        logadoMessage.splice(indexEdit, 0, recado);
        localStorage.setItem("usersMessages", JSON.stringify(logadoMessage));
        populaLista();
    }
}
function getInputsEdit() {
    return {
        description: inputDescriptionEdit.value,
        detail: inputDetailEdit.value
    };
}
