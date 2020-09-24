const app = require('./app');
const { connect } = require('./database');

async function main(){
    //Database connection
    await connect();

    await app.listen(5000);
    console.log('Server on port 5000: Connected');
}

main();