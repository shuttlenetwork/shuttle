import createBareServer from '@tomphttp/bare-server-node';
import http from 'node:http';
import fs from 'fs/promises';
import { createRequire } from 'module';
import express from 'express'; // Moved this line outside of the main function
const require = createRequire(import.meta.url);
const port = process.env.PORT || 80;

async function main() {
  // Create Bare
  const bare = createBareServer('/bare/');

  const app = express(); // Moved this line inside the main function

  // Set up caching for static files
  const cacheOptions = { maxAge: 86400000 }; // Cache static files for 1 day (in milliseconds)
  app.use(express.static('./public', cacheOptions));

  // Use route handling middleware for Express
  app.use((req, res, next) => {
    const routes = {
      '/': 'index.html',
      '/games': 'games.html',
      '/settings': 'settings.html',
      '/apps': 'apps.html',
      '/discord': 'discord.html',
      '/chat': 'chat.html'
    };
    const filename = routes[req.path];

    if (filename) {
      res.sendFile(filename, { root: './html' });
    } else {
      next();
    }
  });

  app.use((req, res) => {
    res.status(404).sendFile('404.html', { root: './html' });
  });

  const httpServer = http.createServer();

  httpServer.on('request', (req, res) => {
    if (bare.shouldRoute(req)) {
      bare.routeRequest(req, res);
    } else {
      app(req, res);
    }
  });

  httpServer.on('error', (err) => console.log(err));
  httpServer.on('upgrade', (req, socket, head) => {
    if (bare.shouldRoute(req)) {
      bare.routeUpgrade(req, socket, head);
    } else {
      socket.end();
    }
  });

  httpServer.listen({ port: port }, () => {
    console.log(`\x1b[42m\x1b[1m shuttle\n Port: ${port}\x1b[0m`);
    console.log('\x1b[41m\x1b[5m\x1b[1m\x1b[33m PLEASE NOTE: Shuttle is in a development stage. Expect bugs!\x1b[0m');
  });
}

main().catch((error) => console.error('An error occurred:', error));
