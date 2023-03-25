//This file goes into the integrations.d flex dir

const TuyAPI = require('tuyapi');

const device = new TuyAPI({
    id: keys.id,
    key: keys.key,
    ip: keys.ip,
    version: '3.3',
    issueRefreshOnConnect: true
});

// Find device on network
device.find().then(() => {
    // Connect to device
    device.connect();
});

// // Add event listeners
// device.on('connected', () => {
//     console.log('Connected to device!');
// });

// device.on('disconnected', () => {
//     console.log('Disconnected from device.');
// });

device.on('error', error => {
    console.log('Error!', error);
});

device.on('dp-refresh', data => {
    console.log('DP_REFRESH data from device: ', data);
});

device.on('data', data => {
    console.log(data);
    device.disconnect();

});

// // Disconnect after 1 seconds
setTimeout(() => { device.disconnect(); }, 100);