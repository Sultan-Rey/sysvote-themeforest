// Configuration de la visibilité des liens sur home.html en fonction du rôle
document.addEventListener("DOMContentLoaded", function () {
    const userType = localStorage.getItem("userType");
  
    // Sélection des liens
    const homeLink = document.getElementById("home-link");
    const votersLink = document.getElementById("voters-link");
    const candidatesLink = document.getElementById("candidates-link");
    const districtsLink = document.getElementById("districts-link");
    const settingsLink = document.getElementById("settings-link");
    const ballotsLink = document.getElementById("ballots-link");
  
    if (userType === "voter") {
      // Masquer les liens réservés aux électeurs pour les admins
      homeLink.style.display = "none";
      votersLink.style.display = "none";
      candidatesLink.style.display = "none";
      districtsLink.style.display = "none";
      settingsLink.style.display = "none";
  
    } else if (userType === "admin") {
        // Masquer les liens réservés aux admins pour les électeurs
        ballotsLink.style.display = "none";
    }
  });

/* ** Voters Module Scripts **/

// JavaScript function to format input as SSN (XXX-XX-XXXX)
        function formatSSN(input) {
            const value = input.value.replace(/\D/g, ''); // Remove non-digit characters
            let formattedSSN = '';
        
            if (value.length > 0) {
                formattedSSN += value.substring(0, 3); // First 3 digits
            }
            if (value.length > 3) {
                formattedSSN += '-' + value.substring(3, 5); // Next 2 digits
            }
            if (value.length > 5) {
                formattedSSN += '-' + value.substring(5, 9); // Last 4 digits
            }
        
            input.value = formattedSSN;
        }
       

function selectVoter(voterId) {
    const voter = getVoterById(voterId); // Fetch voter details based on voterId (implement this function)
    
    // If a voter is found, update the voter details
    if (voter) {
        document.getElementById("no-voter").classList.add("d-none"); // Hide the "No Voter Selected" message
        document.getElementById("voter-info").classList.remove("d-none"); // Show voter info

        // Update voter details
        document.getElementById("voter-photo").src = voter.photoUrl;
        document.getElementById("voter-name").innerText = voter.name;
        document.getElementById("voter-status").innerText = `Status: ${voter.status}`;
        document.getElementById("voter-age").innerText = `Age: ${voter.age}`;
        document.getElementById("voter-district").innerText = `Voting District: ${voter.district}`;
        document.getElementById("voter-access-code").innerText = "****"; // Hide access code initially
        document.getElementById("voter-has-voted").className = voter.hasVoted ? "bi bi-check-circle text-success" : "bi bi-x-circle text-danger"; // Update vote icon

        // Optionally, store the voterId in a hidden field to use later
        document.getElementById("current-voter-id").value = voterId; 
    } else {
        // If no voter is found (for safety)
        alert("Voter not found!");
    }
}


function getVoterById(voterId) {
    // Example voter data (replace this with your actual data fetching logic)
    const voters = [
        { id: 1, name: "John Doe", status: "Approved", age: 35, district: "District 9", photoUrl: "https://via.placeholder.com/100", hasVoted: true },
        { id: 2, name: "Jane Smith", status: "Awaiting", age: 42, district: "District 3", photoUrl: "https://via.placeholder.com/100", hasVoted: false }
    ];

    return voters.find(voter => voter.id === voterId);
}


function toggleAccessCode() {
    const accessCodeElement = document.getElementById("voter-access-code");
    const currentText = accessCodeElement.innerText;
    
    // Toggle between showing the actual access code or hiding it
    if (currentText === "****") {
        accessCodeElement.innerText = "1234-5678"; // Replace with actual access code
    } else {
        accessCodeElement.innerText = "****";
    }
}

        function addVoter() {
            const voterName = document.getElementById('addVoterSSN').value;
            if (voterName) {
                alert(`Voter with ${voterName} SSN Has been added to the electoral list !`);
                document.getElementById('addVoterSSN').value = ''; // Réinitialise le champ
            } else {
                alert('Enter a valide Social Security Number.');
            }
        }

        function searchVoterByName() {
            const searchInput = document.getElementById('searchVoter').value.toLowerCase();
            const voters = document.querySelectorAll('#voters-list .list-group-item');
            voters.forEach(voter => {
                const voterName = voter.querySelector('strong').textContent.toLowerCase();
                if (voterName.includes(searchInput)) {
                    voter.style.display = '';
                } else {
                    voter.style.display = 'none';
                }
            });
        }

        function clearList() {
            alert('Liste effacée !');
            // Logique pour effacer la liste des votants
        }

        function approveAll() {
            alert('Tous les votants ont été approuvés !');
            // Logique
        }
    
        /** Districts Module */


        /** Ballots Module */

        
        let selectedCandidateId = null; // pour suivre l'ID du candidat sélectionné
        let selectedCandidate = null;

function handleSelectCandidate() {
    const selectedCandidateCard = document.querySelector(`.candidate-card[data-id="${selectedCandidateId}"]`);
    const selectedCandidateMiniCard = document.querySelector(`.mini-card[data-id="${selectedCandidateId}"]`);
    if (!selectedCandidateCard && !selectedCandidateMiniCard) {
        console.error("No Candidate selected.");
        return;
    }

    // Marquer le candidat sélectionné avec une "cross"
    selectedCandidateMiniCard.classList.add('selected');
    selectedCandidateCard.classList.add('selected');
    selectedCandidateCard.querySelector('.cross').style.display = 'block';
    selectedCandidateMiniCard.querySelector('.cross').style.display = 'block';
    // Cacher la modal après la sélection
    const modal = bootstrap.Modal.getInstance(document.getElementById('candidateModal'));
    modal.hide();
}

document.querySelectorAll('.candidate-card, .mini-card').forEach(card => {
    card.addEventListener('click', function () {
        selectedCandidateId = this.getAttribute('data-id');
        selectedCandidate = this; // Assigner la carte du candidat sélectionné
         // Vérifier si un candidat est déjà sélectionné
         if (document.querySelector('.candidate-card.selected')) {
            alert('You have already select a candidate.');
            return;
        }
         // Afficher la modal
         const modal = new bootstrap.Modal(document.getElementById('candidateModal'));
        modal.show();
  // Récupérer l'image et le nom du candidat sélectionné
  const candidateImageSrc = selectedCandidate.querySelector('img').src;
        const candidateName = selectedCandidate.querySelector('.candidate-name').innerHTML;
        document.querySelector('#candidateModal  .modal-title').innerHTML = "Make America Great Again";
        // Mettre à jour l'image et le nom dans la modal
        document.querySelector('#candidateModal .candidate-info img').src = candidateImageSrc;
        document.querySelector('#candidateModal .candidate-info h5').innerHTML = candidateName;
        // Si aucun candidat n'est sélectionné, permettre la sélection
      
    });
});



function toggleSelectButton() {
    const selectCheckbox = document.getElementById('selectCheckbox');
    const selectButton = document.getElementById('selectButton');
    selectButton.disabled = !selectCheckbox.checked;
}

function handleDragStart(event) {
    const candidateCard = event.currentTarget; // Récupère l'élément qui déclenche l'événement drag

    // Vérifier si l'élément avec la classe 'cross' est visible dans cette carte
    const crossElement = candidateCard.querySelector('.cross');

    if (crossElement && crossElement.style.display !== 'none') {
        // Récupérer les informations du candidat
        const candidateId = candidateCard.getAttribute('data-id');
        const candidateName = candidateCard.querySelector('.candidate-name').innerHTML;
        const imageSrc = candidateCard.querySelector('img').src;

        // Envoyer les données via dataTransfer
        event.dataTransfer.setData('candidateId', candidateId);
        event.dataTransfer.setData('candidateName', candidateName);
        event.dataTransfer.setData('imageSrc', imageSrc);
    } else {
        alert("You can only drag a candidate that has been selected (with the cross visible).");
        event.preventDefault(); // Empêcher le drag si 'cross' n'est pas visible
    }
}


function handleDragOver(event) {
    event.preventDefault();
    event.currentTarget.classList.add('hovered');
}

function handleDragLeave(event) {
    event.currentTarget.classList.remove('hovered');
}

function handleDrop(event) {
    event.preventDefault();

    const droppedCandidateId = event.dataTransfer.getData('candidateId'); // Obtenir l'ID du candidat déposé
    const candidateName = event.dataTransfer.getData('candidateName');
    const candidateImageSrc = event.dataTransfer.getData('imageSrc');

    // Vérifier si le candidat déposé est bien celui sélectionné
    if (droppedCandidateId !== selectedCandidateId) {
        alert("You can only drop a selected candidat (With red cross visible) in the ballot box.");
        return;
    }

    const ballotBox = event.currentTarget;
    
    // Remplacer l'icône de la boîte de vote par l'image du candidat sélectionné
    ballotBox.innerHTML = `
        <img src="${candidateImageSrc}" alt="voting box" width="50" class="ballot-icon" />
    `;
    
    // Ajouter un texte de confirmation
    const p = document.createElement('p');
    p.textContent = `You selected ${candidateName} as your candidate.`;
    p.className = 'mt-3';
    ballotBox.appendChild(p);

    // Désactiver tous les candidats après la sélection
    disableAllCandidates();
}

function disableAllCandidates() {
    document.querySelectorAll('.candidate-card, .mini-card').forEach(card => {
        card.setAttribute('draggable', 'false');
        card.classList.add('disabled'); // Ajoute une classe CSS pour styliser les candidats désactivés
        card.removeEventListener('click', handleCandidateClick); // Désactive le clic
    });
}

function handleCandidateClick() {
    selectedCandidateId = this.getAttribute('data-id');
    selectedCandidate = this; // Assigner la carte du candidat sélectionné
}


 function toggleSwitchButton() {
    
    // Sélectionner les sections de vote et de résultats
    const voteSection = document.getElementById('voteSection');
    const resultsSection = document.getElementById('resultsSection');
    const ballotSwitch = document.getElementById('toggleSwitch');
    
    if (ballotSwitch.checked) {
        
        // Si le switch est activé (Live Results)
        voteSection.style.display = 'none';
        resultsSection.style.display = 'block';  // Afficher la section des résultats
        callResultMap();
    } else {
        // Si le switch est désactivé (Vote)
        voteSection.style.display = 'block';  // Afficher la section de vote
        resultsSection.style.display = 'none';  // Masquer la section des résultats
    }
}

/** Settings Modules */

    

       function toggleTabs(selectedTab) {
    // Sélectionner les deux éléments tab
    var optionsTab = document.getElementById('options-tab');
    var usersTab = document.getElementById('users-tab');
    
    // Sélectionner les conteneurs
    var settingsContainer = document.getElementById('settings-container');
    var usersOptions = document.getElementById('users-options');
    
    // Si l'onglet "Options" est sélectionné
    if (selectedTab === 'options') {
        optionsTab.classList.remove('bg-light', 'text-dark');
        optionsTab.classList.add('bg-danger', 'text-white');
        
        usersTab.classList.remove('bg-danger', 'text-white');
        usersTab.classList.add('bg-light', 'text-dark');
        
        // Afficher les cartes et masquer les options des utilisateurs
        settingsContainer.style.display = 'block';
        usersOptions.style.display = 'none';
    }
    // Si l'onglet "Users" est sélectionné
    else if (selectedTab === 'users') {
        usersTab.classList.remove('bg-light', 'text-dark');
        usersTab.classList.add('bg-danger', 'text-white');
        
        optionsTab.classList.remove('bg-danger', 'text-white');
        optionsTab.classList.add('bg-light', 'text-dark');
        
        // Masquer les cartes et afficher les options des utilisateurs
        settingsContainer.style.display = 'none';
        usersOptions.style.display = 'block';
    }
}
 