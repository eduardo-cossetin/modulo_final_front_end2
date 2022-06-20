"use strict";
const inputUsernameLogin = document.querySelector("#inputUsernameLogin");
const inputPasswordLogin = document.querySelector("#inputPasswordLogin");
const buttonSignIn = document.querySelector("#buttonSignIn");
const alertIncorreto = document.querySelector("#alertIncorreto");
buttonSignIn.addEventListener("click", () => {
    const catchValues = getInputsValues();
    if (inputUsernameLogin.value === "" || inputPasswordLogin.value === "") {
        alertIncorreto.style.display = "block";
    }
    else if (sameUser(catchValues)) {
        window.location.href = "./recados.html";
        const userLogIn = catchValues.inputUsernameLoginValue;
        localStorage.setItem("userLogIn", userLogIn);
    }
    else {
        alertIncorreto.style.display = "block";
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
