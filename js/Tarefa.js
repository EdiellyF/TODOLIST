export class Tarefa {
    #id;
    #titulo;
    #descricao;
    #data;
    #concluido;

    constructor(titulo, descricao, data) {
        this.#titulo = titulo;
        this.#descricao = descricao;
        this.#data = data;
        this.#concluido = false; 
    }

    
  
    setId(valor) {
        this.#id = valor;
    }


    // Método para marcar a tarefa como concluída
    marcarConcluida() {
        this.#concluido = true;
    }

    marcarnaoConcluida() {
        this.#concluido = false;
    } 

    listarTarefas(){
        return {
            id: this.#id,
            titulo: this.#titulo,
            descricao: this.#descricao,
            data: this.#data,
            concluido: this.#concluido
        }
    }
}


export class TarefaViewer {
    constructor(agenda) {
        console.log('Agenda inicial:', agenda);
       this.tarefa = agenda;
    }

    exibirTarefaspeloId(id) {
        const container = document.getElementById(id);
        container.innerHTML = "";
        
        for (const t of this.tarefa) {
                const tr = document.createElement('tr');

                tr.innerHTML = `
                <td class="id-task">${t.id}</td>
                <td class="titulo-task">${t.titulo}</td>
                <td>${t.descricao}</td>
                <td class="id-data">${t.data}</td>
                <td class="concluido-task">${t.concluido ? "Sim" : "não"}</td>
            `;
            
            // Botão de remover tarefa
            const tdRemove  = document.createElement('td');
            const removeButton = document.createElement('button');
            removeButton.id = 'remover'
            removeButton.dataset.id = t.id;
            tdRemove.appendChild(removeButton);
            tr.appendChild(tdRemove);



          // Adiciona o evento de clique ao botão de remoção
          removeButton.addEventListener('click', () => {
            this.removerTarefa(t.id);
            container.removeChild(tr);
      });
        // Botão de adicionar tarefa
        const tdAdicionar = document.createElement('td');
        const editarTarefas = document.createElement('button');
        editarTarefas.id = 'editar'
        
        editarTarefas.dataset.id = t.id;
        tdAdicionar.appendChild(editarTarefas);
        tr.appendChild(tdAdicionar);
        editarTarefas.addEventListener('click',() => {
            this.editarTarefas(t.id, t.titulo, t.descricao, t.data);
        })
              container.appendChild(tr);
      }
  }

    removerTarefa(tarefaId) {
        // Obtém o usuário logado e a lista de usuários
        const usuarioLogado = JSON.parse(localStorage.getItem('usuarioLogado'));
        const usuariolista = JSON.parse(localStorage.getItem('listausers'));

        // Remove a tarefa pelo ID
        const tarefasAtualizadas = usuarioLogado.tarefas.filter(tarefa => tarefa.id !== tarefaId);
        // Atualize as tarefas no `usuarioLogado`
        usuarioLogado.tarefas = tarefasAtualizadas;

        const usuariosAtualizados = usuariolista.map(user => {
            if (user.id === usuarioLogado.id) {
                return usuarioLogado;
            }
            return user;
        });

           this.atualizarDadosDoLocalStorange(usuarioLogado, usuariosAtualizados)
    }

    editarTarefas(id,titulo,descricao,data, concluido){
        document.querySelectorAll('#pesquisar, #editar, #remover').forEach(elemento => elemento.remove());   
      
        const div = document.getElementsByClassName('cadastro')[0];
        const col = document.createElement('div');
        col.className = 'col-md-2'
        div.appendChild(col);

        const opcoes = [
            { value: "Sim", texto: 'Sim' },
            { value: "não", texto: 'não' }
        ];

        const selectElement = document.createElement('select');
        selectElement.className = 'form-control';
        selectElement.id = 'opcoes';

        opcoes.forEach(opcao => {
            const optionElement = document.createElement('option');
            optionElement.value = opcao.value;
            optionElement.textContent = opcao.texto;
            selectElement.appendChild(optionElement);
        });

       
      const atualizarConclusao =  document.querySelector('#concluido')
      atualizarConclusao.appendChild(selectElement);


        const tarefa = {
            id: id,
            titulo: titulo,
            data: data,
            descricao:descricao, 
            concluido: concluido
        };

        const [dia, mes, ano] = tarefa.data.split('/');
      

        // Preencher os campos de entrada com os dados da tarefa
        document.getElementById('diaConsulta').value = dia;
        document.getElementById('mesConsulta').value = mes;
        document.getElementById('anoConsulta').value = ano;
        document.getElementById('descricaoConsulta').value = tarefa.descricao;
        document.getElementById('opcoes').value = tarefa.concluido;
        document.getElementsByClassName('titulo')[0].value = tarefa.titulo; 
        
                //criar botao de atualizar tarefa
                const buttons = document.getElementById('buttons');
                const btnAtualizar = document.createElement('button');
                btnAtualizar.id = 'btnAtualizar'; 
                buttons.appendChild(btnAtualizar);  
         


            document.getElementById('btnAtualizar').addEventListener('click', () => {
                    // Obtém o usuário logado e a lista de usuários
                    const usuarioLogado = JSON.parse(localStorage.getItem('usuarioLogado'));
                    const listaUsuarios = JSON.parse(localStorage.getItem('listausers')); 
                
                    const tarefaAtualizada = new Tarefa(
                        document.getElementById('titulo').value,
                        document.getElementById('descricaoConsulta').value,
                        `${document.getElementById('diaConsulta').value}/
                        ${document.getElementById('mesConsulta').value}/
                        ${document.getElementById('anoConsulta').value} `
                    );
                    tarefaAtualizada.marcarConcluida(selectElement.value)
                    tarefaAtualizada.setId(id);
                   
                selectElement.value === 'Sim' ? tarefaAtualizada.marcarConcluida() : tarefaAtualizada.marcarnaoConcluida();
                  
                    
                    if (Array.isArray(usuarioLogado.tarefas)) {
                        usuarioLogado.tarefas = usuarioLogado.tarefas.map(tarefa =>
                            tarefa.id === id ? tarefaAtualizada.listarTarefas() : tarefa
                        );
                    } else {
                        usuarioLogado.tarefas = [tarefaAtualizada.listarTarefas()];
                    }
                
                    const usuariosAtualizados = listaUsuarios.map(user =>
                        user.id === usuarioLogado.id ? usuarioLogado : user
                    );
                
                  this.atualizarDadosDoLocalStorange(usuarioLogado, usuariosAtualizados)
                
            });

        };

        filtrar(tarefa) {
            const usuarioLogado = JSON.parse(localStorage.getItem('usuarioLogado'));
            let tarefasFiltradas = usuarioLogado.tarefas;
        
            // Filtragem por título, descrição, e data
            if (tarefa.titulo) {
                tarefasFiltradas = tarefasFiltradas.filter(t => t.titulo.includes(tarefa.titulo));
            }
            if (tarefa.descricao) {
                tarefasFiltradas = tarefasFiltradas.filter(t => t.descricao.includes(tarefa.descricao));
            }
            if (tarefa.data) {
                tarefasFiltradas = tarefasFiltradas.filter(t => t.data === tarefa.data);
            }
        
            return tarefasFiltradas;
        }
        
        atualizarDadosDoLocalStorange(usuarioLogado, usuariosAtualizados){
            localStorage.setItem('usuarioLogado', JSON.stringify(usuarioLogado));
            localStorage.setItem('listausers', JSON.stringify(usuariosAtualizados));

            location.reload(true);
        }

    }



