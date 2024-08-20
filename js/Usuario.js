export class Usuario {

    #id;
    #nome;
    #login;
    #senha;
    #tarefas = [];


    constructor(nome, login, senha){
        this.setNome(nome);
        this.setLogin(login);
        this.setSenha(senha);
    }
    
    setNome (nome) {
        if (typeof nome === "string" && nome.trim() !== "" && nome.length > 1 && nome.length < 40) {
            this.#nome = nome;
        } else {
            throw new Error("Nome inválido.");
        }
    }


    setLogin(login) {
        if (typeof login === "string" && login.trim() !== "" && login.length > 1 && login.length < 30) {
            this.#login = login;
        } else {
            throw new Error("Login inválido.");
        }
    }
    
    setSenha(senha) {
        if (typeof senha === "string" && senha.trim() !== "" && senha.length >= 2) {
            this.#senha = senha;
        } else {
            throw new Error("Senha inválida. Deve ter pelo menos 2 caracteres.");
        }
    }

    setId(id) {
        this.#id = id;
    }

    ToObject(){
        return {
            id: this.#id,
            nome: this.#nome,
            login: this.#login,
            senha:  this.#senha,
            tarefas: this.#tarefas
        }
    }


    adicionarTarefa(tarefa){
        this.#tarefas.push(tarefa);
    }

}

