const inputUsernameLogin = document.querySelector("#inputUsernameLogin") as HTMLInputElement 
const inputPasswordLogin = document.querySelector("#inputPasswordLogin") as HTMLInputElement
const buttonSignIn = document.querySelector("#buttonSignIn") as HTMLButtonElement
const alertIncorreto = document.querySelector("#alertIncorreto") as HTMLDivElement


buttonSignIn.addEventListener("click", () => {
    const catchValues = getInputsValues()    
    if(inputUsernameLogin.value === "" || inputPasswordLogin.value === "") {
        alertIncorreto.style.display ="block"
    } else if (sameUser(catchValues)){
        window.location.href = "./recados.html"
        const userLogIn: string = catchValues.inputUsernameLoginValue
        localStorage.setItem("userLogIn", userLogIn)
    } else {
        alertIncorreto.style.display ="block"
    }
    inputUsernameLogin.value=""
})

function getInputsValues(){   
    return {
        inputUsernameLoginValue: inputUsernameLogin.value,
        inputPasswordLoginValue: inputPasswordLogin.value
    } 
}

function sameUser(catchValues: any){
   const users: Array<any> = JSON.parse(localStorage.getItem("users") || "[]")
   return users.find((element) => element.username === catchValues.inputUsernameLoginValue && element.password === catchValues.inputPasswordLoginValue)
}