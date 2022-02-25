require('dotenv').config();
const express = require('express');
const axios = require('axios');

const app = express();

app.get('/', async (req, res) => {
    const url = `${process.env.URL}`;

    axios
        .get(url)
        .then(json => {
            let response = `<html><head><title>Desafio</title></head><body>`;
            
            json.data.forEach((item, i) => {
                if (i <= 100)
                    response += `<h3>${item.albumId} / ${item.id} - ${item.title}</h3><img src='${item.url}'><br />`;
                else return;
            });

            response += `</body>`;

            return res.status(201).send(response);
        })
        .catch(error => {
            console.log(error);
            return res.status(400).json({ error: error });
        });
});

app.listen(`${process.env.PORT}`, () => {
    console.log(`Example app listening at http://localhost:${process.env.PORT}`);
});
