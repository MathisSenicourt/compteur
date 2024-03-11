async function incrementerValeurEquipe1(score) {
    const currentValue = await getValueFirstTeamFromServer();
    setFirstTeamScoreOnServer(parseInt(currentValue) + score);
    document.getElementById("Score1").innerText = await getValueFirstTeamFromServer();
}

async function incrementerValeurEquipe2(score) {
    const currentValue = await getValueSecondTeamFromServer();
    setSecondTeamScoreOnServer(parseInt(currentValue) + score);
    document.getElementById("Score2").innerText = await getValueSecondTeamFromServer();
}

async function reinitialiserValeurs() {
    await setFirstTeamScoreOnServer(0);
    await setSecondTeamScoreOnServer(0);
    document.getElementById("Score1").innerText = await getValueFirstTeamFromServer();
    document.getElementById("Score2").innerText = await getValueSecondTeamFromServer();
}

async function init() {
    document.getElementById("Score1").innerText = await getValueFirstTeamFromServer();
    document.getElementById("Score2").innerText = await getValueSecondTeamFromServer();
}

init();

// Associer les fonctions aux boutons
document.getElementById("button1").addEventListener("click", () => incrementerValeurEquipe1(1));
document.getElementById("button2").addEventListener("click", () => incrementerValeurEquipe1(2));
document.getElementById("button3").addEventListener("click", () => incrementerValeurEquipe1(3));
document.getElementById("button4").addEventListener("click", () => incrementerValeurEquipe1(-1));
document.getElementById("button5").addEventListener("click", () => incrementerValeurEquipe2(1));
document.getElementById("button6").addEventListener("click", () => incrementerValeurEquipe2(2));
document.getElementById("button7").addEventListener("click", () => incrementerValeurEquipe2(3));
document.getElementById("button8").addEventListener("click", () => incrementerValeurEquipe2(-1));
document.getElementById("lastButton").addEventListener("click", () => reinitialiserValeurs());

function getValueFirstTeamFromServer() {
    fetch('/getFirstTeamValue')
        .then(async response => {
            if (!response.ok) {
                throw new Error('Erreur lors de la récupération de la valeur de la première équipe');
            }
            return response.text();
        })
        .then(data => {
            console.log('Valeur de la première équipe :', data);
            // Faites ce que vous voulez avec la valeur de la première équipe ici
        })
        .catch(error => {
            console.error('Erreur:', error);
        });
}

function getValueSecondTeamFromServer() {
    fetch('/getSecondTeamValue')
        .then(async response => {
            if (!response.ok) {
                throw new Error('Erreur lors de la récupération de la valeur de la deuxiéme équipe');
            }
            return response.text();
        })
        .then(data => {
            console.log('Valeur de la deuxiéme équipe :', data);
        })
        .catch(error => {
            console.error('Erreur:', error);
        });
}

function setFirstTeamScoreOnServer(score) {
    fetch('/setFirstTeamScore/' + score)
        .then(async response => {
            if (!response.ok) {
                throw new Error('Erreur lors de la définition du score de la première équipe');
            }
            return response;
        })
        .then(data => {
            console.log('Score de la première équipe défini avec succès');
        })
        .catch(error => {
            console.error('Erreur:', error);
        });
}

function setSecondTeamScoreOnServer(score) {
    fetch('/setSecondTeamScore/' + score)
        .then(async response => {
            if (!response.ok) {
                throw new Error('Erreur lors de la définition du score de la deuxième équipe');
            }
            return response;
        })
        .then(data => {
            console.log('Score de la deuxième équipe défini avec succès');
        })
        .catch(error => {
            console.error('Erreur:', error);
        });
}

