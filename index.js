const express = require('express');
const exphbs = require('express-handlebars');
const http = require('http');
const path = require('path');

const app = express();
const Server = http.Server;
const server = new Server(app);
const io = require('socket.io');
const socket = io(server);
const hbs = exphbs.create({ defaultLayout: 'main', layoutsDir: `${__dirname}/views/layouts` });
const exec = require('child_process').exec;
const url = 'www.google.fr';

// set development evironment
process.env.NODE_ENV = 'development';

// enable 'public' dir listing
app.use('/public', express.static(path.join(__dirname, 'public')));

// Register `hbs.engine` with the Express app.
app.engine('handlebars', hbs.engine);
app.set('view engine', 'handlebars');

// starting server
server.listen(3000);

// rendering main page
app.get('/', (req, res) => {
    res.render('templates/home', {
        url,
        cache: false,
    });
});

socket.on('connection', (connection) => {
    connection.emit('userAgentRequest');
    connection.on('userAgentResponse', (message) => {
        const command = (message === 'Windows') ? (
          `ping -n 1 ${url}`
        ) : (
          `ping -c 1 ${url}`
        );
        setInterval(() => {
            exec(command, (error, stdout) => {
                let time;
                let ms;
                if (message === 'Windows') {
                    time = stdout
                        ? stdout.substring(stdout.indexOf('temps='), stdout.indexOf(' ms '))
                        : '';
                    ms = time ? time.replace('temps=', '') : '';
                }
                else {
                    time = stdout
                        ? stdout.substring(stdout.indexOf('time='), stdout.indexOf(' ms'))
                        : '';
                    ms = time ? time.replace('time=', '') : '';
                }

                connection.emit('ping', { time: ms });

                return 0;
            });
        }, 1000);
    });
    connection.on('disconnect', () => {
        clearInterval();
    });
});
