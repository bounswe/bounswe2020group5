const Cryptr = require('cryptr');
const cryptr = new Cryptr(process.argv[2]);


const fs = require('fs')


fs.readFile('./secrets.json', 'utf8' , (err, data) => {
  if (err) {
    console.error(err)
    return
  }
  var obj = JSON.parse(data);

  console.log(obj['g_client_id'])

  obj['g_client_id'] = cryptr.decrypt(obj['g_client_id']);
  obj['f_app_id'] = cryptr.decrypt(obj['f_app_id']);

    const data_to_write = JSON.stringify(obj);

// write JSON string to a file
    fs.writeFile('./secrets.json', data_to_write, (err) => {
        if (err) {
            throw err;
        }
        console.log("JSON data is saved.");
    });

})
