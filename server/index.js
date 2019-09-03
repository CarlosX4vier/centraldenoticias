const http = require('http');
const express = require('express')
const app = express()
const MongoClient = require('mongodb');
const url = "mongodb://localhost:27017";
const credentials = require("./credentials")

async function getArticles(categoria) {
    let con = await MongoClient.connect(url, { useNewUrlParser: true });
    let dbo = con.db("noticiasApp");
    console.log("> Categoria a ser pesquisada: " + categoria);
    http.get("http://newsapi.org/v2/everything?q=" + categoria + "&apiKey=" + credentials.newsapi + "&language=pt&sortBy=publishedAt", (res) => {

        res.setEncoding('utf8');
        let rawData = '';
        res.on('data', (chunk) => { rawData += chunk; });
        res.on('end', async () => {
            try {
                const parsedData = JSON.parse(rawData);
                for (noticia of parsedData.articles) {
                    noticia.data = (Date.parse(noticia.publishedAt)) / 1000

                    var not = {
                        title: noticia.title,
                        desc: noticia.description,
                        fonte: noticia.source.name,
                        image: noticia.urlToImage,
                        categoria: categoria,
                        data: noticia.data
                    }
                    let quant = await dbo.collection("noticias").find(not).count();
                    if (quant == 0) {
                        dbo.collection("noticias").insert(not)
                        console.log(">" + noticia.title + " publicada em " + data + " inserida no banco");
                    }
                }
            } catch (e) {
                console.error(e.message);
            }
        });

    })
    con.close()
}

app.get('/', async (req, res) => {
    let con = await MongoClient.connect(url);
    var dbo = con.db("noticiasApp");

    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Content-type", "application/json")
    artigos = [];

    let cats = await dbo.collection("categorias").find({}).toArray();
    console.log("> Banco carregado!");

    for (cat of cats) {
        getArticles(cat.titulo)
        let noticias = await dbo.collection("noticias").find({ categoria: cat.titulo }).sort({ data: -1 }).limit(5).toArray();
        artigos.push({
            title: cat.titulo,
            ordem: cat.ordem,
            artigos: []
        })
        let tam = artigos.length - 1;
        for (noticia of noticias) {
            artigos[tam].artigos.push({
                title: noticia.title,
                desc: noticia.desc,
                image: noticia.image,
                fonte: noticia.fonte
            })
        }
    }
    res.send(artigos)
})


app.listen(8080);