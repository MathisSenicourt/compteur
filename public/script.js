async function getValueFirstTeamFromServer() {
    try {
        const response = await fetch('/getFirstTeamValue');
        if (!response.ok) {
            throw new Error('Erreur lors de la récupération de la valeur de la première équipe');
        }
        const data = await response.text();
        console.log('Valeur de la première équipe :', data);
        return data;
    } catch (error) {
        console.error('Erreur:', error);
        throw error;
    }
}

async function getValueSecondTeamFromServer() {
    try {
        const response = await fetch('/getSecondTeamValue');
        if (!response.ok) {
            throw new Error('Erreur lors de la récupération de la valeur de la deuxième équipe');
        }
        const data = await response.text();
        console.log('Valeur de la deuxième équipe :', data);
        return data;
    } catch (error) {
        console.error('Erreur:', error);
        throw error;
    }
}

async function setFirstTeamScoreOnServer(score) {
    try {
        const response = await fetch('/setFirstTeamScore/' + score);
        if (!response.ok) {
            throw new Error('Erreur lors de la définition du score de la première équipe');
        }
        console.log('Score de la première équipe défini avec succès');
    } catch (error) {
        console.error('Erreur:', error);
        throw error;
    }
}

async function setSecondTeamScoreOnServer(score) {
    try {
        const response = await fetch('/setSecondTeamScore/' + score);
        if (!response.ok) {
            throw new Error('Erreur lors de la définition du score de la deuxième équipe');
        }
        console.log('Score de la deuxième équipe défini avec succès');
    } catch (error) {
        console.error('Erreur:', error);
        throw error;
    }
}

async function incrementerValeurEquipe1(score) {
    try {
        const currentValue = await getValueFirstTeamFromServer();
        const parsedValue = parseInt(currentValue);
        if (!isNaN(parsedValue)) {
            await setFirstTeamScoreOnServer(parsedValue + score);
            document.getElementById("Score1").innerText = await getValueFirstTeamFromServer();
        } else {
            console.error('La valeur renvoyée par le serveur pour l\'équipe 1 n\'est pas un nombre valide');
        }
    } catch (error) {
        console.error('Erreur:', error);
    }
}

async function incrementerValeurEquipe2(score) {
    try {
        const currentValue = await getValueSecondTeamFromServer();
        const parsedValue = parseInt(currentValue);
        if (!isNaN(parsedValue)) {
            await setSecondTeamScoreOnServer(parsedValue + score);
            document.getElementById("Score2").innerText = await getValueSecondTeamFromServer();
        } else {
            console.error('La valeur renvoyée par le serveur pour l\'équipe 2 n\'est pas un nombre valide');
        }
    } catch (error) {
        console.error('Erreur:', error);
    }
}

async function reinitialiserValeurs() {
    try {
        await setFirstTeamScoreOnServer(0);
        await setSecondTeamScoreOnServer(0);
        document.getElementById("Score1").innerText = await getValueFirstTeamFromServer();
        document.getElementById("Score2").innerText = await getValueSecondTeamFromServer();
    } catch (error) {
        console.error('Erreur:', error);
    }
}

async function init() {
    try {
        document.getElementById("Score1").innerText = await getValueFirstTeamFromServer();
        document.getElementById("Score2").innerText = await getValueSecondTeamFromServer();
    } catch (error) {
        console.error('Erreur:', error);
    }
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