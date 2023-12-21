const http = require('http');
const { exec } = require('child_process');
const fs = require('fs');

const server = http.createServer((req, res) => {
  if (req.url === '/') {
    // Charger le fichier HTML pour l'application client
    fs.readFile('client.html', 'utf8', (err, data) => {
      if (err) {
        res.writeHead(500, { 'Content-Type': 'text/plain' });
        res.end('Erreur interne du serveur');
      } else {
        res.writeHead(200, { 'Content-Type': 'text/html' });
        res.end(data);
      }
    });
  } else if (req.url === '/reboot') {
    // Redémarrer le PC
    exec('shutdown /r /t 0', (error, stdout, stderr) => {
      if (error) {
        console.error(`Une erreur s'est produite : ${error}`);
        res.writeHead(500, { 'Content-Type': 'text/plain' });
        res.end('Erreur lors du redémarrage du PC.');
      } else {
        console.log('Redémarrage en cours...');
        res.writeHead(200, { 'Content-Type': 'text/plain' });
        res.end('Le PC est en cours de redémarrage.');
      }
    });
  } else {
    res.writeHead(404, { 'Content-Type': 'text/plain' });
    res.end('Page non trouvée');
  }
});

server.listen(3000, '192.168.11.114', () => {
  console.log('Serveur démarré sur l\'adresse 192.168.11.114:3000');
});
