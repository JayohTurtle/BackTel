const chat = document.getElementById('chat')

const devAchat = document.getElementById('dev-achat').innerHTML
const montantAchat = document.getElementById('montant-achat').innerHTML
const devVente = document.getElementById('dev-vente').innerHTML
const montantVente = document.getElementById('montant-vente').innerHTML

const message = `I buy ${devAchat} ${montantAchat} against ${devVente} ${montantVente}`
let chatWindow

chat.addEventListener('click', () => {
    
    if (chatWindow && !chatWindow.closed) {
        chatWindow.focus()
    } else {
        chatWindow = window.open("https://mail.google.com/chat/u/0/#chat/space/AAAAEOYovSw", "_blank")
        if (chatWindow) {
            localStorage.setItem('googleChatOpen', true)
            chatWindow.onbeforeunload = function() {
                localStorage.removeItem('googleChatOpen')
            }
        }
    }

    // Copier le message dans le presse-papiers
    navigator.clipboard.writeText(message).then(() => {
        console.log('Message copié dans le presse-papiers : ' + message);
    }).catch(err => {
        console.error('Erreur lors de la copie du message dans le presse-papiers : ', err)
    })
    window.location.href='coursClient.html'
})


console.log(message)
