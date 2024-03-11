// Fonction pour récupérer la valeur à partir du CSV
function getValueFromCSV(equipe) {
    const url = 'score.csv';

    return new Promise((resolve, reject) => {
        fetch(url)
            .then(response => response.text())
            .then(csv => {
                const lignes = csv.split('\n');
                if (equipe >= 0 && equipe < lignes.length) {
                    const valeurs = lignes[equipe].split(',');
                    const res = valeurs[0];
                    console.log("Ligne", equipe, ":", res);
                    resolve(res); // Renvoyer la valeur extraite depuis le CSV
                } else {
                    reject("Numéro de ligne invalide");
                }
            })
            .catch(error => {
                console.error('Erreur lors de la récupération du fichier CSV :', error);
                reject(error);
            });
    });
}

// Initialisation des valeurs
let valeur1 = getFirstScorePlus(0);
let valeur2 = getSecondScorePlus(0);

async function getFirstScorePlus(number) {
    try {
        const valeur1 = parseInt(await getValueFromCSV(0)); // Convertir la valeur en entier
        document.getElementById("valeur1").innerText = valeur1 + number;
    } catch (erreur) {
        console.error(erreur);
    }
}

// Fonction pour incrémenter la valeur 2
async function getSecondScorePlus(number) {
    try {
        const valeur2 = parseInt(await getValueFromCSV(1)); // Convertir la valeur en entier
        document.getElementById("valeur2").innerText = valeur2 + number;
    } catch (erreur) {
        console.error(erreur);
    }
}


// Fonction pour décrémenter les valeurs et les réinitialiser
function reinitialiserValeurs() {
    valeur1 = 0;
    valeur2 = 0;
    document.getElementById("valeur1").innerText = valeur1;
    document.getElementById("valeur2").innerText = valeur2;
}

// Associer les fonctions aux boutons
document.getElementById("button1").addEventListener("click", getFirstScorePlus(1));
document.getElementById("button2").addEventListener("click", getFirstScorePlus(2));
document.getElementById("button3").addEventListener("click", getFirstScorePlus(3));
document.getElementById("button4").addEventListener("click", getFirstScorePlus(-1));
document.getElementById("button5").addEventListener("click", getSecondScorePlus(1));
document.getElementById("button6").addEventListener("click", getSecondScorePlus(2));
document.getElementById("button7").addEventListener("click", getSecondScorePlus(3));
document.getElementById("button8").addEventListener("click", getSecondScorePlus(-1));
document.getElementById("lastButton").addEventListener("click", reinitialiserValeurs);
