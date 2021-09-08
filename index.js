const {PORT} = require("./config/globals");

const {app} = require("./server");
const {GetConnected} = require("./database/db/dbConnection");

GetConnected().then(()=>{
    app.listen (PORT,()=>console.log(`El servidor esta funcionando ${PORT}`));
}).catch (console.log)
