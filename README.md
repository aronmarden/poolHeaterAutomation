```
# DC Inverter Swimming Pool Heater Monitor

This repository contains the files required to monitor a DC Inverter Swimming Pool Heater that has a Smart Life (Tuya Smart) IoT wifi box and send telemetry to New Relic.

## Prerequisites

To use this project, you will need the following:

- A DC Inverter Swimming Pool Heater with a Smart Life (Tuya Smart) IoT wifi box
- A Tuya developer account
- Node modules from [codetheweb/tuyapi](https://github.com/codetheweb/tuyapi)
- A `keys.json` file containing the necessary key information for Tuya Smart
- A New Relic account
- New Relic API keys (optional)

## Installation

1. Clone this repository to your local machine using the following command:

```

git clone https://github.com/<username>/<repository-name>.git

```

2. Install the necessary dependencies by running the following command:

```

npm install

```

3. Follow the instructions in the [codetheweb/tuyapi](https://github.com/codetheweb/tuyapi) repository to set up your Tuya developer account and fill out the `keys.json` file with the necessary key information.

4. If you wish to use the full functionality of this file with New Relic, you will need to obtain New Relic API keys and add them to the `.env` file in the following format:

```

NEW_RELIC_LICENSE_KEY=<your-new-relic-license-key>
NEW_RELIC_APP_NAME=<your-new-relic-app-name>

```

## Usage

To start monitoring your DC Inverter Swimming Pool Heater and sending telemetry to New Relic, run the following command:

```

npm start

```

This will start the Node.js script, which will connect to your device and start sending telemetry to New Relic.

## Work in Progress

This repository is a work in progress and may contain incomplete or experimental features. Please use it with caution and report any issues or bugs that you encounter.
```
