"use strict";
const inputUsername = document.querySelector("#inputUsername");
const inputPassword = document.querySelector("#inputPassword");
const inputRepeatPassword = document.querySelector("#inputRepeatPassword");
const buttonSignUp = document.querySelector("#buttonSignUp");
const users = JSON.parse(localStorage.getItem("users") || "[]");
buttonSignUp.addEventListener("click", () => {
    const user = getUserInputs();
    if (userExist(user)) {
        alert("Usuário já existe!");
    }
    else {
        addUserLocalStorage(user);
        window.location.href = "./index.html";
        // window.location.href="recados.html"
    }
});
function getUserInputs() {
    return {
        username: inputUsername.value,
        password: inputPassword.value,
    };
}
function userExist(user) {
    return users.find(elemento => elemento.username === user.username);
}
function addUserLocalStorage(user) {
    users.push(user);
    localStorage.setItem("users", JSON.stringify(users));
}
