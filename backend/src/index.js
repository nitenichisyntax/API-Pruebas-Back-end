const app = require('./app');
const { connect } = require('./database');

async function main(){
    //Database connection
    try{
        await connect();

        await app.listen(5000);
        console.log('Server on port 5000: Connected');
    }catch{
        console.log('Problem to connect');
    }
}

main();