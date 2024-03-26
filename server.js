const express = require('express');
const fs = require('fs');
const csv = require('csv-parser');
const createCsvWriter = require('csv-writer').createObjectCsvWriter;

const app = express();
const port = 3000;

app.use(express.static('public'));
app.use(express.json());

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/public/index.html');
});

app.get('/getFirstTeamValue', (req, res) => {
    getValueTeam(0, (err, value) => {
        if (err) {
            res.status(500).send("Erreur lors de la récupération de la valeur de la première équipe");
        } else {
            res.send(value);
        }
    });
});

app.get('/getSecondTeamValue', (req, res) => {
    getValueTeam(1, (err, value) => {
        if (err) {
            res.status(500).send("Erreur lors de la récupération de la valeur de la deuxième équipe");
        } else {
            res.send(value);
        }
    });
});

function getValueTeam(team, callback) {
    console.log("getValueTeam")
    const results = [];
    fs.createReadStream('score.csv')
        .pipe(csv())
        .on('data', (data) => results.push(data))
        .on('end', () => {
            if (results.length > team) {
                const row = results[team];
                const teamValue = row[Object.keys(row)[0]];
                callback(null, teamValue);
            } else {
                callback("Il n'y a pas d'équipe " + (team+1) + " dans le fichier CSV", null);
            }
        });
}

app.get('/setFirstTeamScore/:score', (req, res) => {
    const score = req.params.score;
    updateValueTeam(0, score, (err, message) => {
        if (err) {
            res.status(500).send("Erreur lors de la définition du score de la première équipe : " + err);
        } else {
            res.send(message);
        }
    });
});

app.get('/setSecondTeamScore/:score', (req, res) => {
    const score = req.params.score;
    updateValueTeam(1, score, (err, message) => {
        if (err) {
            res.status(500).send("Erreur lors de la définition du score de la deuxième équipe : " + err);
        } else {
            res.send(message);
        }
    });
});

function updateValueTeam(team, newValue, callback) {
    console.log("updateValueTeam " + team+" = value : "+newValue);
    const results = [];
    fs.createReadStream('score.csv')
        .pipe(csv())
        .on('data', (data) => results.push(data))
        .on('end', () => {
            if (results.length >= team) {
                const row = results[team];
                const key = Object.keys(row)[0];
                row[key] = newValue;
                const ws = fs.createWriteStream('score.csv');
                ws.write(Object.keys(results[0]).join(',') + '\n');
                results.forEach((data) => {
                    ws.write(Object.values(data).join(',') + '\n');
                });
                ws.end();
                callback(null, "La valeur de l'équipe " + team + " a été mise à jour avec succès.");
            } else {
                callback("Il n'y a pas d'équipe " + team + " dans le fichier CSV", null);
            }
        });
}

app.listen(port, () => {
    console.log(`Le serveur est lancé sur http://localhost:${port}`);
});