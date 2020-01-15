const fs = require('fs');
const readline = require('readline');
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

const argv = process.argv.slice(2); //real input
// const argv = ['http://www.google.com', './text.txt'] //use when too lazy to type

const request = require('request');
request(argv[0], (error, response, body) => {
  console.log('error:', error);
  console.log('statusCode:', response && response.statusCode);

  if (response.statusCode === 200) {

    const writeFile = function() {
      fs.writeFile(argv[1], body, (err, data) => {
        if (!err) {
          fs.stat(argv[1], function(err, stats) {
            console.log(`Downloaded and saved ${stats.size} bytes to ${argv[1]}`);
          })
        } else console.log('invalid file path');
      })
    };

    if (fs.existsSync(argv[1])) {
      console.log('file already exist!');
      rl.question(`Would you like to overwrite file? (enter 'y' for yes) `, (ans) => {
        rl.close();
        if (ans === 'y') writeFile();
        else console.log('fetch aborted');
      });
    } else writeFile();

  }
});