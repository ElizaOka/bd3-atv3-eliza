/* Renderização da lista de dados */
const listAluno = document.querySelector('#aluno-list');

function renderList(doc) {
    let aluno = document.createElement('li'); // Use <li> para melhor semântica
    let nome_aluno = document.createElement('span');
    let cpf = document.createElement('span');
    let rg = document.createElement('span');
    let tel_aluno = document.createElement('span');
    let tel_responsavel = document.createElement('span');
    let email = document.createElement('span');
    let data_nascimento = document.createElement('span');

    aluno.setAttribute('data-id', doc.id)

    
    nome_aluno.textContent =doc.nome_aluno;
    cpf.textContent =doc.cpf;
    rg.textContent =doc.rg;
    tel_aluno.textContent =doc.tel_aluno;
    tel_responsavel.textContent =doc.tel_responsavel;
    email.textContent =doc.email;
    data_nascimento.textContent = doc.data().data_nascimento || 'N/A';
    
    // Verifica se o campo existe e formata a data
    if (data.data_nascimento) {
        const dateObj = new Date(data.data_nascimento);
        data_nascimento.textContent = dateObj.toLocaleDateString(); // Formata a data
    } else {
        data_nascimento.textContent = 'N/A';
    }

    aluno.appendChild(nome_aluno);
    aluno.appendChild(cpf);
    aluno.appendChild(rg);
    aluno.appendChild(tel_aluno);
    aluno.appendChild(tel_responsavel);
    aluno.appendChild(email);
    aluno.appendChild(data_nascimento);

    listAluno.appendChild(aluno);
}

db.collection('BD3-NoSQL-Firestore')
   .get()
   .then((snapshot) => {
       snapshot.docs.forEach(doc => {
           renderList(doc); // Passa o documento completo
       });
   })
   .catch((error) => {
       console.error("Erro ao recuperar documentos:", error);
   });

/* Inserção de dados */
const form = document.querySelector('#add-aluno-form');

form.addEventListener('submit', (event) => {
   event.preventDefault();

   db.collection('BD3-NoSQL-Firestore').add({
       nome_aluno: form.nome_aluno.value,
       cpf: form.cpf.value,
       rg: form.rg.value,
       tel_aluno: form.tel_aluno.value,
       tel_responsavel: form.tel_responsavel.value,
       email: form.email.value,
       data_nascimento: form.data_nascimento.value
   }).then(() => {
       form.reset(); // Limpa o formulário
       window.location.reload(); // Recarrega a página para mostrar os novos dados
   }).catch((error) => {
       console.error("Erro ao adicionar aluno:", error);
   });
});