const http = require('http');
const TuyAPI = require('tuyapi');
const fs = require('fs');
const path = require('path');
const keysFilePath = path.join(__dirname, 'keys.json');

// Read the contents of keys.json file
const keysData = fs.readFileSync(keysFilePath, 'utf8');

// Parse the JSON data
const keys = JSON.parse(keysData);

const device = new TuyAPI({
    id: keys.id,
    key: keys.key
});

function sendNewRelicChangeTracking(version) {
    return fetch('https://api.newrelic.com/graphql', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'API-Key': keys['API-Key']
        },
        body: JSON.stringify({
            query: `mutation {
        changeTrackingCreateDeployment(deployment: {version: "${version}", entityGuid: "${keys.entityGuid}"}) {
          deploymentId
          entityGuid
        }
      }`,
            variables: ''
        })
    })
        .then(response => response.json())
        .catch(error => console.error(error));
}

// Find device on network
device.find().then(() => {
    // Connect to device
    device.connect();
});

device.on('error', error => {
    console.log('Error!', error);
});

const server = http.createServer((req, res) => {
    if (req.method === 'POST' && req.url === '/webhook') {
        let body = '';
        req.on('data', chunk => {
            body += chunk.toString();
        });
        req.on('end', () => {
            try {
                const payload = JSON.parse(body);
                console.log('Received webhook payload:', payload);
                if (payload.solar_output === 'low') {
                    device.set({ dps: 1, set: false }).then(() => {
                        console.log('Pool Heater turned Off');
                        sendNewRelicChangeTracking('Pool Heater turned Off')
                            .then(data => {
                                // Handle the response data here
                                console.log(data);
                            })
                            .catch(error => console.error(error));
                    });
                } else if (payload.solar_output === 'high') {
                    device.set({ dps: 1, set: true }).then(() => {
                        console.log('Pool Heater turned On');
                        sendNewRelicChangeTracking('Pool Heater turned On')
                            .then(data => {
                                // Handle the response data here
                                console.log(data);
                            })
                            .catch(error => console.error(error));
                    });
                } else {
                    console.log('Unknown payload:', payload);
                }
                res.writeHead(200);
                res.end();
            } catch (error) {
                console.error('Error parsing payload:', error);
                res.writeHead(400);
                res.end('Invalid payload');
            }
        });
    } else {
        res.writeHead(404);
        res.end('Not found');
    }
});

server.listen(8080, () => {
    console.log('New Relic Webhook server listening on port 8080');
});
