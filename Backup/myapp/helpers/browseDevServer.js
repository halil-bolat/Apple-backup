/*
 * This small helper will open your default browser and load
 * the configured URL of your Node dev server.
 */

const opn = require('opn');

const host = process.env.HOST || 'localhost';
const port = process.env.PORT || 3000;

opn(`http://${host}:${port}`);
