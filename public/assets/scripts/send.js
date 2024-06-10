// Quand la page est chargée fait un log.
console.log("Page Rechargée !");

// Fonction pour envoyer une requête au serveur
function envoyerRequete(id, chapter) {
    const url = 'http://localhost:81/api';  // Remplace par l'URL de ton serveur
    const data = {
        id: id,
        chapter: chapter
    };

    fetch(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    })
    .then(response => response.json())
    .then(data => {
        console.log('Succès:', data);
        afficherResultats(data);
    })
    .catch((error) => {
        console.error('Erreur:', error);
    });
}

// Fonction pour afficher les résultats dans le DOM
function afficherResultats(data) {
    const resultContainer = document.getElementById('resultats');
    resultContainer.innerHTML = ''; // Efface le contenu précédent

    // Vérifie si data.audio_file.audio_url est définie et non vide
    if (data.audio_file && data.audio_file.audio_url && data.audio_file.audio_url.trim() !== '') {
        // Crée un bouton pour rediriger vers l'URL audio
        const audioButton = document.createElement('button');
        audioButton.textContent = 'Écouter l\'audio';
        audioButton.addEventListener('click', () => {
            window.open(data.audio_file.audio_url, '_blank'); // Redirige vers l'URL audio
        });
        resultContainer.appendChild(audioButton); // Ajoute le bouton au conteneur de résultats
    } else {
        // Affiche un message d'erreur si l'URL audio est absente ou vide
        resultContainer.textContent = 'L\'URL audio est absente ou vide dans la réponse de l\'API.';
    }
}

// Fonction pour gérer la soumission du formulaire
function handleFormSubmit(event) {
    event.preventDefault(); // Empêche la soumission du formulaire de recharger la page
    const id = document.getElementById('id').value;
    const chapter = document.getElementById('chapter').value;
    console.log(`ID: ${id}, Chapter: ${chapter}`); // Log des valeurs pour vérification
    envoyerRequete(id, chapter);
}

document.addEventListener('DOMContentLoaded', (event) => {
    const form = document.getElementById('requestForm');
    form.addEventListener('submit', handleFormSubmit);
});