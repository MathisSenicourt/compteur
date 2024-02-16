// Fonction pour récupérer la valeur à partir du CSV
function getValueFromCSV(filename) {
    // Ici, vous auriez votre logique pour récupérer la valeur depuis le fichier CSV
    // Pour cet exemple, je vais simplement simuler une valeur aléatoire
    return Math.floor(Math.random() * 100); // Valeur aléatoire entre 0 et 99
}

// Initialisation des valeurs
let valeur1 = getValueFromCSV("fichier1.csv");
let valeur2 = getValueFromCSV("fichier2.csv");

// Fonction pour incrémenter la valeur de 1
function incrementerValeur1() {
    valeur1 += 1;
    document.getElementById("valeur1").innerText = valeur1;
}

// Fonction pour incrémenter la valeur de 2
function incrementerValeur2() {
    valeur2 += 2;
    document.getElementById("valeur2").innerText = valeur2;
}

// Fonction pour décrémenter les valeurs et les réinitialiser
function reinitialiserValeurs() {
    valeur1 = 0;
    valeur2 = 0;
    document.getElementById("valeur1").innerText = valeur1;
    document.getElementById("valeur2").innerText = valeur2;
}

// Associer les fonctions aux boutons
document.getElementById("button1").addEventListener("click", incrementerValeur1);
document.getElementById("button2").addEventListener("click", incrementerValeur1);
document.getElementById("button3").addEventListener("click", incrementerValeur1);
document.getElementById("button4").addEventListener("click", incrementerValeur1);
document.getElementById("button5").addEventListener("click", incrementerValeur2);
document.getElementById("button6").addEventListener("click", incrementerValeur2);
document.getElementById("button7").addEventListener("click", incrementerValeur2);
document.getElementById("button8").addEventListener("click", incrementerValeur2);
document.getElementById("lastButton").addEventListener("click", reinitialiserValeurs);
