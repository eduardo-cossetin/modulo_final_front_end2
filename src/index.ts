const inputUsernameLogin = document.querySelector("#inputUsernameLogin") as HTMLInputElement 
const inputPasswordLogin = document.querySelector("#inputPasswordLogin") as HTMLInputElement
const buttonSignIn = document.querySelector("#buttonSignIn") as HTMLButtonElement


buttonSignIn.addEventListener("click", () => {
    const catchValues = getInputsValues()    
    if (sameUser(catchValues)){
        alert("Usuário cadastrado")
        window.location.href = "./recados.html"
        const userLogIn: string = catchValues.inputUsernameLoginValue
        localStorage.setItem("userLogIn", userLogIn)
    } else {
        alert("Usuário não cadastrado ou senha incorreta!")
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