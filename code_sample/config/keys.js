/**
 * This file is used to determine which set of keys to use based on the environment.
 * If the environment is production, then it uses the keys from keys_prod.js.
 * Otherwise, it uses the keys from keys_dev.js.
 * This file is used in the app.js file.
 */
if (process.env.NODE_ENV === "production") {
  module.exports = require("./keys_prod");
} else {
  module.exports = require("./keys_dev");
}
