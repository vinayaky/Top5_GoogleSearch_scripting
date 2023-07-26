const express = require('express');
const axios = require('axios');
const cheerio = require('cheerio');

const app = express();
const PORT = 5000;

app.use(express.json());
app.use((_req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', '*');

  next();
});

app.get('/api/search', async (req, res) => {
 const query=req.query.q
 
 
  axios.get('https://app.scrapingbee.com/api/v1/store/google', {
    params: {
        'api_key': 'RIGFNO5XN0J2C9HOBVVTZN0EZW5O64SQ9ZLZ576I5BE5S9P13NW3RSPUD3ISZS035GRYYTHKUP46N9NW',
        'search': query,
        'nb_results':5,

    }
}).then( async(response)=> {

const top5Urls = response.data.organic_results.map(result => result.url);
console.log(top5Urls)
const texts = [];
for (const url of top5Urls) {
const pageContent= await axios.get(url)
const $ = cheerio.load(pageContent.data);
const text = $('body').text().trim(); 
texts.push(text);
console.log(text)

}
console.log(texts)
res.send(texts);
})

});

app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));
