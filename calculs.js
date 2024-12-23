const devAchat = document.getElementById('dev-achat').innerHTML;
const devVente = document.getElementById('dev-vente').innerHTML;
const coursClient = document.getElementById('cours-client');
const montantAchat = parseFloat(document.getElementById('montant-achat').innerHTML);
const montantVente = parseFloat(document.getElementById('montant-vente').innerHTML);
const marge = 0.005;
const inforeuro = parseFloat(document.getElementById('INF').innerHTML);
const btnMarge = document.getElementById('btn-marge');

const cotation = document.getElementById('cotation-client');

let cotationText = cotation.innerHTML;
let devA = cotationText.slice(0, 3);
let devB = cotationText.slice(4, 7);

let isOriginalOrder = true; // Variable pour suivre l'état de l'ordre

const icon = document.querySelector('.icon');

btnMarge.addEventListener('click', () => {
    const coursBank = parseFloat(document.getElementById('cours-bank').value);
    const margeClient = (coursBank * marge);

    if (devB === devVente) {
        coursClient.value = (coursBank + margeClient).toFixed(4);
    } else {
        coursClient.value = (coursBank - margeClient).toFixed(4);
    }

    let montantX;
    if (isNaN(montantAchat)) {
        montantX = montantVente;
    } else {
        montantX = montantAchat;
    }

    const montantNX = montantX / parseFloat(coursClient.value);
    const formatMontantNX = montantNX.toLocaleString('fr-FR', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
    document.getElementById('montant-vente').innerHTML = formatMontantNX;
    const gainClient = (montantX / inforeuro) - montantNX;
    const formatGainClient = gainClient.toLocaleString('fr-FR', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
    const gainImp = montantNX - (montantX / coursBank);
    const formatGainImp = gainImp.toLocaleString('fr-FR', { minimumFractionDigits: 2, maximumFractionDigits: 2 });

    // Mettre à jour le montant-achat ici après tout le calcul
    const formatMontantAchat = montantAchat.toLocaleString('fr-FR', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
    document.getElementById('montant-achat').innerHTML = formatMontantAchat;
    document.getElementById('gain-imp').innerHTML = formatGainImp;
    document.getElementById('gain-client').innerHTML = formatGainClient;
});

icon.addEventListener('click', () => {
    const coursBank = parseFloat(document.getElementById('cours-bank').value);
    const margeClient = (coursBank * marge);

    // Inverser l'état de l'ordre
    isOriginalOrder = !isOriginalOrder;

    if (isOriginalOrder) {
        cotation.innerHTML = `${devA}/${devB}`;
    } else {
        cotation.innerHTML = `${devB}/${devA}`;
    }

    // Mettre à jour les valeurs de cotationText, devA et devB après chaque clic
    cotationText = cotation.innerHTML;
    [devA, devB] = cotationText.split('/');

    // Mise à jour du cours client après inversion de l'état de l'ordre
    if (devB === devVente) {
        coursClient.value = (coursBank + margeClient).toFixed(4);
    } else {
        coursClient.value = (coursBank - margeClient).toFixed(4);
    }
});





