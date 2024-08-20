const container = document.getElementById('container');
const buttonCadastrar = document.getElementById('register');
const buttonLogin = document.getElementById('login-trocar');

buttonCadastrar.addEventListener('click', () => {
    container.classList.add("active");

});

buttonLogin.addEventListener('click', () => {
    container.classList.remove("active");

});

