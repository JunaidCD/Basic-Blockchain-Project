const Block = require("./Block");
const cryptoHash = require("./crypto-hash");

class Blockchain {
    constructor() {
        this.chain = [Block.genesis()];
    }

    addBlock({ data }) {
        const newBlock = Block.mineBlock({
            prevBlock: this.chain[this.chain.length - 1],
            data,
        });
        this.chain.push(newBlock);
    }

    replaceChain(chain) {
        console.log("Current chain:", this.chain);
        console.log("Incoming chain:", chain);

        if (chain.length <= this.chain.length) {
            console.error("The incoming chain is not longer than the current chain.");
            return;
        }

        if (!Blockchain.isValidChain(chain)) {
            console.error("The incoming chain is not valid.");
            return;
        }

        console.log("Replacing the current chain with the new chain.");
        this.chain = chain;
    }

    static isValidChain(chain) {
        if (JSON.stringify(chain[0]) !== JSON.stringify(Block.genesis())) {
            console.error("Genesis block does not match.");
            return false;
        }

        for (let i = 1; i < chain.length; i++) {
            const { timestamp, prevHash, hash, nonce, difficulty, data } = chain[i];
            const lastDifficulty = chain[i-1].difficulty;
            const realLastHash = chain[i - 1].hash;

            if (prevHash !== realLastHash) {
                console.error(`Invalid hash at block ${i}. Expected ${realLastHash}, got ${prevHash}.`);
                return false;
            }

            const validateHash = cryptoHash(timestamp, prevHash, nonce, difficulty, data);
            if (hash !== validateHash) {
                console.error(`Invalid hash at block ${i}. Expected ${validateHash}, got ${hash}.`);
                return false;
            }

            if (Math.abs(lastDifficulty - difficulty) > 1) {
                console.error(`Difficulty jump at block ${i}.`);
                return false;
            }
        }

        return true;
    }
}

module.exports = Blockchain;
