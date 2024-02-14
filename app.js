const express = require('express');
const fs = require('fs');
const yaml = require('yamljs');
const csv = require('csv-parser');
const app = express();
const PORT = process.env.PORT || 3000;


app.get('/txt', (req, res) => {
    fs.readFile('data_files/Greeting.txt', 'utf8', (err, data) => {
        if (err) {
            res.status(500).send("Error reading the TXT file");
            return;
        }
        res.type('text/plain');
        res.send(data);
    });
});


app.get('/csv', (req, res) => {
    let results = [];
    fs.createReadStream('data_files/Greeting.csv')
      .pipe(csv())
      .on('data', (data) => results.push(data))
      .on('end', () => {
        res.json(results);
      });
});


app.get('/json', (req, res) => {
    fs.readFile('data_files/Greeting.json', 'utf8', (err, data) => {
        if (err) {
            res.status(500).send("Error reading the JSON file");
            return;
        }
        res.json(JSON.parse(data));
    });
});


app.get('/xml', (req, res) => {
    fs.readFile('data_files/Greeting.xml', 'utf8', (err, data) => {
        if (err) {
            res.status(500).send("Error reading the XML file");
            return;
        }
        res.type('application/xml');
        res.send(data);
    });
});


app.get('/yaml', (req, res) => {
    yaml.load('data_files/Greeting.yaml', (result) => {
        res.json(result);
    });
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
