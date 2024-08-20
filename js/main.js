import {Usuario } from './Usuario.js';
import {Usuarios} from './Usuarios.js';
import { geraNovoSerial, lidarComErros} from './utils.js';

document.addEventListener("DOMContentLoaded", () => {
    document.getElementById("cadastro").addEventListener('click', cadastrarUsuario);
    document.getElementById("entrar").addEventListener('click', logarUsuario);
   
    
    
    
    function cadastrarUsuario(event){
        event.preventDefault(); 

            const usuariosLista = new Usuarios();

            const nome = document.getElementById('nome-cadastro').value;
            const login = document.getElementById('login-cadastro').value;
            const senha = document.getElementById('senha-cadastro').value;
             
            const usuario = new Usuario(nome, login, senha);
            usuario.setId(geraNovoSerial);
            usuariosLista.adicionarUsers(usuario.ToObject());

   }

   function logarUsuario(event) {
        event.preventDefault();

        try{
            const usuariosLista = new Usuarios();
                const login = document.getElementById("login").value;
                const senha = document.getElementById("senha").value;
            
                const encontrarUsuario = usuariosLista.buscarUsers(login,senha);

            if(encontrarUsuario){   
                    localStorage.setItem('usuarioLogado', JSON.stringify(encontrarUsuario));
                    window.location.href = 'tarefas.html';
            }
        } catch(error){
                lidarComErros(error.message);
        }

   }

  
   


});
