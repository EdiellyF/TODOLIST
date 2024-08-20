export class Usuarios {
     #listaDeUsuario = [];

     constructor() {
      const listaUsersString = localStorage.getItem('listausers');
      if (listaUsersString === null) {
          localStorage.setItem('listausers', JSON.stringify([]));
      }
      this.#listaDeUsuario = JSON.parse(localStorage.getItem('listausers'));
  }

  buscarUsers(login, senha) {
   const EncontrarUser = this.#listaDeUsuario.find((user) =>
       user.login === login &&
       user.senha === senha
   );

   if (EncontrarUser) {
       return EncontrarUser;
   } else {
       throw new Error("Nenhum usuário encontrado");
   }
}

     adicionarUsers(user){
        const loginExistente =  this.#listaDeUsuario.find((l) => l.login === user.login);
            if(loginExistente) {
                alert(`Já existe um usuário com esse login: ${user.login}`);
                return; 
            }
            this.#listaDeUsuario.push(user);
            this.salvar();
     }

     salvar(){
        localStorage.setItem('listausers', JSON.stringify(this.#listaDeUsuario));
     }

}