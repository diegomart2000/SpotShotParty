const chalk = require('chalk');
exports.log = (message, ...props) => console.log(`${chalk.blue('[SSP]')} - ${message}`, ...props);
exports.error = (message, ...props) => console.error(`${chalk.blue("[SSP]")} - ${chalk.red(message)}`, ...props);
