const express = require('express');
const fs = require('fs');
const { url } = require('inspector');

const app = express();
const port = 3002;

app.use(express.json());

app.get('/', (req,res) => {
  fs.readFile('data.json', 'utf8',(err,data) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ error: 'Internal Server Error' });
    }
    const series = JSON.parse(data).Series;
    res.json(series);
  });
});

//todo id를 얻어서 그 결과로 검색하기..바보짓을 하는 것같은데....!!!!!!!!!!!이렇게 url을 하나하나 만들어서 요청을 받아야하는건가...?!
const apiKey = '4f7a2baa745822c7e805100300f62cc6';
const searchTerms = ["너의 모든 것","굿 걸스","성난 사람들"];
const BASE_LANG = 'ko';
const BASE_REGION = 'KR';
// 배열을 문자열로 변환 (쉼표로 구분)
// const searchTermString = searchTerms.join(',');
const searchRequests  = searchTerms.map(term => {
  const searchTermString = encodeURIComponent(term);
  const url = `https://api.themoviedb.org/3/search/tv?api_key=${apiKey}&language=${BASE_LANG}&region=${BASE_REGION}&query=${searchTermString}`;

// console.log(searchUrls);
// const searchUrl = `https://api.themoviedb.org/3/search/tv?api_key=${apiKey}&language=${BASE_LANG}&region=${BASE_REGION}&query=${encodeURIComponent(searchTerms)}`;

  // const searchUrl = `https://api.themoviedb.org/3/search/tv?api_key=${apiKey}&query=${encodeURIComponent(searchTerm)}&language=${BASE_LANG}&region=${BASE_REGION}`;
// const resultUrl = `https://api.themoviedb.org/3/tv/78191?api_key=${apiKey}&language=${BASE_LANG}&region=${BASE_REGION}`;
  
  return fetch(url)
    .then(response => response.json())
    // .then(data => {
      // if (data.results && data.results.length > 0) {
      //   const movie = data.results[0];
      //   console.log(movie);
      //   return movie;
      // } else {
      //   return null;
      // }
      // const movie = data;
      // console.log(movie);
    // })
    .catch(error => {
      console.error('Error fetching data:', error);
      return null;
    });
  });
// 모든 검색 결과를 기다린 후에 처리
Promise.all(searchRequests)
  .then(results => {
    // console.log(results);
    results.forEach(result => {
      console.log(result);
    });
  })
  .catch(error => {
    console.error(`Error fetching data for one or more search terms: ${error}`);
  });


app.listen(port, ()=> {
  console.log(`${port}`);
})