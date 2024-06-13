// IMPORTING NECESSARY FUNCTIONALITY
const fs = require('fs');
const needle = require('needle');

// TAKES IN TWO CLI ARGUMENTS
processArray = process.argv
identifiersArray = [];
if (processArray.length === 4){
identifiersArray.push(processArray[2], processArray[3])
} else {
  console.log('Error: incorrect argument length')
}

// VARIABLE INITS (SETUP)
const url = processArray[2];
const localFilePath = processArray[3];
let fileSize;

// USES IDENTIFIERS FOR WORK
needle.get(url, function(error, response) {
  if (!error && response.statusCode == 200){
    fs.writeFile(localFilePath, response.body, 'utf8', () => {
      fs.readFile(localFilePath, 'utf8', (error, data) => {
        if(error){
          console.log(`An Error Was Experienced: ${error.message}`)
        }
        fileSize = data.length;
        console.log(`Downloaded and saved ${fileSize} bytes to ${localFilePath}`);
      })
    })
  }
});

