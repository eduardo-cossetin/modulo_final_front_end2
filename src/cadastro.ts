const inputUsername = document.querySelector("#inputUsername") as HTMLInputElement
const inputPassword = document.querySelector("#inputPassword") as HTMLInputElement
const inputRepeatPassword = document.querySelector("#inputRepeatPassword") as HTMLInputElement
const buttonSignUp = document.querySelector("#buttonSignUp") as HTMLButtonElement

const users: Array<any> = JSON.parse(localStorage.getItem("users") || "[]")

buttonSignUp.addEventListener("click", () => {
    const user = getUserInputs()

    if(inputPassword.value !== inputRepeatPassword.value){
        alert("As senhas não são iguais")
    } else if (userExist(user)){
        alert("Usuário já existe!")
    } else {    
        addUserLocalStorage(user)
        window.location.href = "./index.html"
        // window.location.href="recados.html"
    }   
})

function getUserInputs(){
    return  {
        username: inputUsername.value,
        password: inputPassword.value,
    }    
}

function userExist (user: any){
    return users.find (elemento => elemento.username === user.username)
}

function addUserLocalStorage(user: any){
    users.push(user)
    localStorage.setItem("users", JSON.stringify(users))
}
