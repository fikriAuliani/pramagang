//Routing-Response NodeJs and ExpressJs

//NodeJs

// const http = require('http');
// const fs = require('fs');

//default nodejs, const port = 3000; 

// const port = 5000;
// const host = 'localhost';

// http.createServer((req, res) => {
//     res.writeHead(200, 
//         {
//              'Content-Type': 'text-html'
//         });

//     const url = req.url;

        
//     const getPage = (path, res) => {
//         fs.readFile(path, (err, data) => {      //untuk pemanggilan file html or someelse harus ada function server(fs)
//              if(err) {
//                 res.writeHead(404);
//                 res.write('Not Found');
//              } else {
//                 res.write(data);
//              }
//              res.end();
//         });
//     }

//     if(url === '/about') {
//         //res.write('Ini Halaman About');
//         //res.end();
//         getPage('./about.html', res);
//     } else if (url === '/contact') {
//         //res.write('Ini Halaman Kontak');
//         //res.end();
//         getPage('./contact.html', res);
//     } else if (url === '/'){
//        getPage('/.index.html', res);
//     } else {
//         //res.write('Ini Halaman Home');
//         //res.end();
//         getPage('',res);
//     }
//  }).listen(port, () => {
//      console.log(`Server berjalan pada http//${host}:${port}`);
// });


//ExpressJs

const express = require('express')
const app = express()
const port = 3000

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.get('/about', (req, res) => {
    res.sendFile('./about.html', {root: __dirname})
  })

app.get('/detail/:id', (req, res) => {
    // res.sendFile('./about.html', {root: __dirname})
    res.send(`Selamat Datang ` + req.params.id)
  })

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})


