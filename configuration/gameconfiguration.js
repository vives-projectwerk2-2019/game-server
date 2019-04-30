require('dotenv').config();

module.exports = {
    "turnLength": parseInt(process.env.TURN_LENGTH) || 5,
    "heartbeat": parseInt(process.env.HEARTBEAT) || 1000
};