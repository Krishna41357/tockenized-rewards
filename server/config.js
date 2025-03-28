require("dotenv").config();

module.exports = {
  APTOS_NODE_URL: " https://fullnode.devnet.aptoslabs.com",
  MODULE_ADDRESS: "0x3543a21a5743405a49210fd230b74f6ab2c962e89b3d9a7b019e168f0256825a",
  MONGO_URI: process.env.MONGO_URI || "mongodb://localhost:27017/token_rewards"
};
