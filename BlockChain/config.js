const MINE_RATE = 1000;  // Adjust the time it takes to mine a block
const INITIAL_DIFFICULTY = 2;  // Initial difficulty level for the first block

const GENESIS_DATA = {
    timestamp: 1,
    prevHash: "0x000",
    hash: "0x123",
    difficulty: INITIAL_DIFFICULTY,
    nonce: 0,
    data: [],
};

module.exports = { GENESIS_DATA, MINE_RATE };
