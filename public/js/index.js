"use strict";
const inputUsernameLogin = document.querySelector("#inputUsernameLogin");
const inputPasswordLogin = document.querySelector("#inputPasswordLogin");
const buttonSignIn = document.querySelector("#buttonSignIn");
buttonSignIn.addEventListener("click", () => {
    const catchValues = getInputsValues();
    if (sameUser(catchValues)) {
        alert("Usuário cadastrado");
        window.location.href = "./recados.html";
        const userLogIn = catchValues.inputUsernameLoginValue;
        localStorage.setItem("userLogIn", userLogIn);
    }
    else {
        alert("Usuário não cadastrado ou senha incorreta!");
    }
    inputUsernameLogin.value = "";
});
function getInputsValues() {
    return {
        inputUsernameLoginValue: inputUsernameLogin.value,
        inputPasswordLoginValue: inputPasswordLogin.value
    };
}
function sameUser(catchValues) {
    const users = JSON.parse(localStorage.getItem("users") || "[]");
    return users.find((element) => element.username === catchValues.inputUsernameLoginValue && element.password === catchValues.inputPasswordLoginValue);
}
