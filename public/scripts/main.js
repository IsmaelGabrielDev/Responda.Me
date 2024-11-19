import Modal from './modal.js'

const modal = Modal()

const modalTitle = document.querySelector('.modal h2')
const modalDescription = document.querySelector('.modal p')
const modalButton = document.querySelector('.modal button')

const checkButtons = document.querySelectorAll('.actions a.check')

function mensagemRetorno(mensagem) {
  var notification = document.getElementById('notification');

  notification.innerText = mensagem;
  notification.style.display = 'block';
  
  setTimeout(function() {
      notification.style.display = 'none';
  }, 5000);
};

document.getElementById('room-id').addEventListener('click', function() {
  const codigoSala = this.dataset.id;

  navigator.clipboard.writeText(codigoSala).then(() => {
      mensagemRetorno("Código copiado com sucesso!");
  }).catch(err => {
      mensagemRetorno("Falha ao copiar o texto. Por favor, copie manualmente.");
  });
});

checkButtons.forEach(button => {
  button.addEventListener('click', handleClick)
})

const deleteButton = document.querySelectorAll('.actions a.delete')

deleteButton.forEach(button => {
  button.addEventListener('click', event => handleClick(event, false))
})

function handleClick(event, check = true) {
  event.preventDefault()
  const text = check ? 'Marcar como lida' : 'Excluir'
  const slug = check ? 'check' : 'delete'
  const roomId = document.querySelector('#room-id').dataset.id
  const questionId = event.target.dataset.id

  const form = document.querySelector('.modal form')
  form.setAttribute('action', `/question/${roomId}/${questionId}/${slug}`)

  modalTitle.innerHTML = `${text} esta pergunta`
  modalDescription.innerHTML = `Tem certeza que deseja ${text.toLowerCase()} esta pergunta ?`
  modalButton.innerHTML = `Sim, ${text}`
  check ? modalButton.classList.remove('red') : modalButton.classList.add('red')

  modal.open()
}
