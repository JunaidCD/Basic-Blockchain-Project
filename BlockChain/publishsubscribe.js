const redis = require('redis');
const Blockchain = require('./Blockchain');

const CHANNELS = {
    TEST: "TEST",
    BLOCKCHAIN: "BLOCKCHAIN",
};

class PubSub {
    constructor({ blockchain }) {
        this.blockchain = blockchain;
        this.publisher = redis.createClient();
        this.subscriber = redis.createClient();

        this.subscriber.subscribe(CHANNELS.TEST);
        this.subscriber.subscribe(CHANNELS.BLOCKCHAIN);

        this.subscriber.on('message', (channel, message) => 
            this.handleMessage(channel, message)
        );
    }

