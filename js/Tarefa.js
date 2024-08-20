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
    
        if (!Array.isArray(this.tarefa)) {
            console.error('Erro: this.tarefa não é um array.');
            return;
        }
        
        for (const t of this.tarefa) {
                const tr = document.createElement('tr');

                const tdId = document.createElement('td');
                tdId.className = 'id-task'
                tdId.textContent = t.id;
                tr.appendChild(tdId);

                const tdTitulo = document.createElement('td');
                tdTitulo.textContent = t.titulo;
                tdTitulo.className = 'titulo-task'
                tr.appendChild(tdTitulo);

                const tdDescricao = document.createElement('td');
                tdDescricao.textContent = t.descricao;
                tr.appendChild(tdDescricao);

                const tdData = document.createElement('td');
                tdData.textContent = t.data;
                tdData.className = 'id-data'
                tr.appendChild(tdData);

                const tdConcluido = document.createElement('td');
                tdConcluido.textContent = t.concluido ? 'Sim' : 'Não';
                tr.appendChild(tdConcluido);


                // Botão de remover tarefa
                const tdRemove  = document.createElement('td');
                const removeButton = document.createElement('button');
                removeButton.className = 'btn btn-danger';
                removeButton.id = 'remover'
                removeButton.textContent = 'Remover';
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
          editarTarefas.className = 'btn btn-sucess';
          editarTarefas.id = 'editar'
          editarTarefas.textContent = 'Editar';
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

        // Atualize o `localStorage` com os dados novos
        localStorage.setItem('usuarioLogado', JSON.stringify(usuarioLogado));
        localStorage.setItem('listausers', JSON.stringify(usuariosAtualizados));
    }

    editarTarefas(id,titulo,descricao,data){
        const elementosParaRemover = document.querySelectorAll('#pesquisar, #editar, #remover');
        elementosParaRemover.forEach(elemento => elemento.remove());   
      
        const div = document.getElementsByClassName('cadastro')[0];
        const col = document.createElement('div');
        col.className = 'col-md-2'
        div.appendChild(col);

        const classe_titulo = document.createElement('input');
        classe_titulo.className = 'form-control titulo'
        classe_titulo.placeholder = 'Titulo'
        classe_titulo.type = 'text';
        col.appendChild(classe_titulo);

        const tarefa = {
            id: id,
            titulo: titulo,
            data: data,
            descricao:descricao
        };

        const [dia, mes, ano] = tarefa.data.split('/');

        // Preencher os campos de entrada com os dados da tarefa
        document.getElementById('diaConsulta').value = dia;
        document.getElementById('mesConsulta').value = mes;
        document.getElementById('anoConsulta').value = ano;
        document.getElementById('descricaoConsulta').value = tarefa.descricao;
        document.getElementsByClassName('titulo')[0].value = tarefa.titulo; 
        
             //criar botao de atualizar tarefa
            const buttons = document.getElementById('buttons');
            const btnAtualizar = document.createElement('button');
            btnAtualizar.className = 'btn btn-success'; 
            btnAtualizar.textContent = 'Atualizar';
            btnAtualizar.id = 'btnAtualizar'; 
       
            buttons.appendChild(btnAtualizar);

            btnAtualizar.addEventListener('click', () => {
                    // Obtém o usuário logado e a lista de usuários
                    const usuarioLogado = JSON.parse(localStorage.getItem('usuarioLogado'));
                    const listaUsuarios = JSON.parse(localStorage.getItem('listausers')); 
                
                    const tarefaAtualizada = new Tarefa(
                        classe_titulo.value,
                        document.getElementById('descricaoConsulta').value,
                        `${document.getElementById('diaConsulta').value}/
                        ${document.getElementById('mesConsulta').value}/
                        ${document.getElementById('anoConsulta').value} `
                    );
                    tarefaAtualizada.setId(id);
                    
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
                
                    localStorage.setItem('usuarioLogado', JSON.stringify(usuarioLogado));
                    localStorage.setItem('listausers', JSON.stringify(usuariosAtualizados));

                    location.reload(true);
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
        

    }



