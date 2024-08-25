import { Tarefa, TarefaViewer } from "./Tarefa.js";
import { geraNovoSerial, lidarComErros, typeWriter } from './utils.js';

document.addEventListener("DOMContentLoaded", function() {
    let usuarioLogado = JSON.parse(localStorage.getItem('usuarioLogado'));

    // Verifica se `usuarioLogado` não é nulo, indefinido, ou não é um objeto
    if (!usuarioLogado || typeof usuarioLogado !== 'object') {
        alert("Nenhum usuário logado ou dados corrompidos. Redirecionando para a página de login.");
        window.location.href = './index.html'; 
        return;
    }

    document.getElementById('cadastrartarefa').addEventListener('click', cadastrartarefa);



    // Exibe as tarefas e a mensagem de boas-vindas ao carregar o DOM
    mostrarTarefa();
    bemVindo();
    
    function mostrarTarefa(){
        const tarefas = usuarioLogado.tarefas;
        const tarefaVisualizar = new TarefaViewer(tarefas);
        tarefaVisualizar.exibirTarefaspeloId('viewTarefas');
    }


    function cadastrartarefa(event) {
        event.preventDefault();

        const campos = [
            { id: 'TituloCadastro', mensagem: 'O título é obrigatório.<br>' },
            { id: 'anoCadastro', mensagem:'O ano é obrigatório. <br>' },
            { id: 'mesCadastro', mensagem: 'O mês é obrigatório.<br>' },
            { id: 'diaCadastro', mensagem: 'O dia é obrigatório. <br>' },
            { id: 'descricaoCadastro', mensagem: 'A descrição é obrigatória. <br>' }
        ];

        // Cria um array para armazenar mensagens de erro
         const erros = campos.filter(campo => !document.getElementById(campo.id).value).map(campo => campo.mensagem);
         
         if (erros.length > 0) {
            lidarComErros(erros);
            return; 
        } 
    
           
            
         const anoCadastro = document.getElementById('anoCadastro').value;
         const diaCadastro = document.getElementById('diaCadastro').value;
         const mesCadastro = document.getElementById('mesCadastro').value;
         const tituloCadastro = document.getElementById('TituloCadastro').value;
         const descricaoCadastro = document.getElementById('descricaoCadastro').value;
 
        const data = `${diaCadastro}/${mesCadastro}/${anoCadastro}`;

        const tarefa = new Tarefa(tituloCadastro, descricaoCadastro, data);
        tarefa.setId(geraNovoSerial());

        usuarioLogado.tarefas.push(tarefa.listarTarefas());
        console.log("Tarefas do usuário logado após adicionar nova tarefa:", usuarioLogado.tarefas);

        localStorage.setItem('usuarioLogado', JSON.stringify(usuarioLogado));
        const usuarios = JSON.parse(localStorage.getItem('listausers'));
        

        const usuariosAtualizados = usuarios.map(user => {
            if (user.id === usuarioLogado.id) {
                return usuarioLogado;
            }
            return user;
        });

      
        localStorage.setItem('listausers', JSON.stringify(usuariosAtualizados));

        alert("Tarefa cadastrada com sucesso!");
        recarregarPagina()
     
    }

   
   function bemVindo(){
            const div = document.getElementById('nomeUsuario');
            div.innerHTML = `Bem vindo(a) ${usuarioLogado.nome}`;
            typeWriter(div);
    };
  
    function recarregarPagina() {
        setTimeout(() => {
            location.reload();
        }, 2000);
    }
    

    function pesquisarTarefa(){
        // Obter valores dos campos de consulta
          const data = `${document.getElementById('diaConsulta').value}/
          ${document.getElementById('mesConsulta').value}/
          ${document.getElementById('anoConsulta').value}`;

          const descricao = document.getElementById('descricaoConsulta').value;
          const titulo = document.getElementById('titulo').value;

    // Criar um objeto de tarefa para a filtragem
        const tarefa = {
            data: data.trim(),  
            descricao: descricao.trim(),
            titulo: titulo
          };
       // Obter a lista de tarefas do usuário logado
    const usuarioLogado = JSON.parse(localStorage.getItem('usuarioLogado'));
    const listaDeTarefas = usuarioLogado.tarefas || [];

    // Criar uma instância de TarefaViewer com a lista de tarefas
    const viewer = new TarefaViewer(listaDeTarefas);

    // Filtrar as tarefas com base nos filtros fornecidos
    const tarefasFiltradas = viewer.filtrar(tarefa);

    // Exibir ou processar as tarefas filtradas conforme necessário
    console.log('t',tarefasFiltradas);

    const container = document.getElementById('viewTarefas');
    container.innerHTML = "";

    tarefasFiltradas.forEach(t => {
      

        tr.innerHTML = `
        <td class="id-task">${t.id}</td>
        <td class="titulo-task">${t.titulo}</td>
        <td>${t.descricao}</td>
        <td class="id-data">${t.data}</td>
        <td class="concluido-task">${t.concluido ? "Sim" : "não"}</td>
    `;

    container.appendChild(tr);

    });

        }

       document.getElementById('pesquisar').addEventListener('click', pesquisarTarefa);
      
});
