const chalk = require('chalk');
module.exports.log = (message, ...props) => console.log(`${chalk.blue('[SSP]')} - ${message}`, ...props);
module.exports.error = (message, ...props) => console.error(`${chalk.blue("[SSP]")} - ${chalk.red(message)}`, ...props);
