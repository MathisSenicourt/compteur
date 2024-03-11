const express = require('express');
const fs = require('fs');
const csv = require('csv-parser');
const createCsvWriter = require('csv-writer').createObjectCsvWriter;

const app = express();
const port = 3000;

// Serveur Express pour servir les fichiers statiques
app.use(express.static('public'));

// Route pour servir la page HTML
app.get('/', (req, res) => {
    res.sendFile(__dirname + '/public/index.html');
});


// Route pour appeler la fonction getValueFirstTeam et renvoyer la valeur de la première équipe
app.get('/getFirstTeamValue', (req, res) => {
    getValueTeam(0, (err, value) => {
        if (err) {
            res.status(500).send("Erreur lors de la récupération de la valeur de la première équipe");
        } else {
            res.send(value);
        }
    });
});


// Route pour appeler la fonction getValueSecondTeam et renvoyer la valeur de la deuxième équipe
app.get('/getSecondTeamValue', (req, res) => {
    getValueTeam(1,(err, value) => {
        if (err) {
            res.status(500).send("Erreur lors de la récupération de la valeur de la deuxième équipe");
        } else {
            res.send(value);
        }
    });
});

// Fonction pour récupérer la valeur de l'équipe passé en paramétre depuis le fichier score.csv
function getValueTeam(team, callback) {
    const results = [];
    fs.createReadStream('score.csv')
        .pipe(csv())
        .on('data', (data) => results.push(data))
        .on('end', () => {
            if (results.length > team) {
                const row = results[team];
                const secondTeamValue = row[Object.keys(row)[0]];
                callback(null, secondTeamValue);
            } else {
                callback("Il n'y a pas "+team+" équipe dans le fichier CSV", null);
            }
        });
}

// Route pour définir le score de la première équipe
app.get('/setFirstTeamScore/:score', (req, res) => {
    const score = req.params.score;
    setTeamScore(0, score, (err, message) => {
        if (err) {
            res.status(500).send("Erreur lors de la définition du score de la première équipe : " + err);
        } else {
            res.send(message);
        }
    });
});

// Route pour définir le score de la deuxième équipe
app.get('/setSecondTeamScore/:score', (req, res) => {
    const score = req.params.score;
    setTeamScore(1, score, (err, message) => {
        if (err) {
            res.status(500).send("Erreur lors de la définition du score de la deuxième équipe : " + err);
        } else {
            res.send(message);
        }
    });
});


// Fonction pour définir le score de l'équipe passé en paramètre dans le fichier score.csv
function setTeamScore(team, newScore, callback) {
    const results = [];
    fs.createReadStream('score.csv')
        .pipe(csv())
        .on('data', (data) => results.push(data))
        .on('end', () => {
            if (results.length > team) {
                results[team][Object.keys(results[team])[0]] = newScore;
                const csvWriter = createCsvWriter({
                    path: 'score.csv',
                    header: [{id: Object.keys(results[team])[0], title: Object.keys(results[team])[0]}]
                });
                csvWriter.writeRecords(results)
                    .then(() => {
                        callback(null, "Score défini avec succès pour l'équipe " + (team+1));
                    })
                    .catch((error) => {
                        callback(error, null);
                    });
            } else {
                callback("Il n'y a pas " + team + " équipe dans le fichier CSV", null);
            }
        });
}


// Démarrez le serveur
app.listen(port, () => {
    console.log(`Le serveur est lancé sur http://localhost:${port}`);
});
