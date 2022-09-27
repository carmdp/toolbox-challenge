var axios = require('axios');

const instance = axios.create({
    baseURL:"https://echo-serv.tbxnet.com/v1/secret/",
    headers: { 
        'Authorization': 'Bearer aSuperSecretKey'
    }
});

/**
 * Return list files in format JSON
 * @param {Object} req  
 * @param {Object} res 
 * @returns JSON Data
 */
async function GetDataFiles(req, res){

    try {
        //Get list files
        const listFiles = await callFiles().then( response => response);

        //Initialization variable return
        const arreObj = [];

        for (let file of listFiles.files) { 
            //Get file content  
            const dataFile = await 
                callFile(file)
                .then( response => response)
                .catch((err)=>{
                    //Return null if the file is wrong or does not found
                    if (err.response.status === 404 || err.response.status === 500 )
                        return null;
                    
                    throw new Error(error);
                })
            
            //Add element to return variable
            if (dataFile != null){
                console.log(dataFile);
                let convertToJson = formatedData(dataFile); //Convert file csv to json
                if (convertToJson.length > 0){
                    arreObj.push({
                        file:file,
                        lines:convertToJson
                    });
                }
            }
        }
      
        res.send(arreObj);
    
    } catch (error) {
        return res.send({
            "status": error.response.status,
            "code": error.code,
            "message": error.message
        })
    }

}


/**
 * Return list files
 * @param {Object} req 
 * @param {Object} res 
 * @returns 
 */
async function GetListFiles(req, res){

    try {
        //Get list files
        const listFiles = await callFiles().then( response => response);

      
        res.send(listFiles);
    
    } catch (error) {
        return res.send({
            "status": error.response.status,
            "code": error.code,
            "message": error.message
        })
    }

}


/**
 * Convert file csv to json
 * @param {Array} data  
 * @returns Array Objects
 */
function formatedData(data){
    //Initialization variable return
    let dataJson=[];
    
    let rows = data.split('\n'); //Separated by rows
    
    let columnsHeaders = rows[0].split(','); //Separated by columns
      
    for (let i = 1; i <= rows.length-1; i++){

        let columnsFields = rows[i].split(','); //Separated by fields

        //if columns equal fields, create object with key/values 
        if (columnsHeaders.length === columnsFields.length ) {
            let obj = generateObject(columnsHeaders,columnsFields); //Create object with key/values 
            dataJson.push(obj); //Add new elemen to dataJson for return
        }

    }
       
    return dataJson;

}


/**
 * Create object with key/values
 * @param {String} keys 
 * @param {String} values 
 * @returns Object 
 */
function generateObject(keys,values){
    let obj={};

    for(let i=1; i <= keys.length-1; i++){
        obj[keys[i]] = values[i];
    }
    
    return obj;
}


 /**
  * Call list files external api
  * @returns Object
  */
 const callFiles = () => {
    try {
        return instance.get('files').then( res => res.data);
    } catch (error) {
       throw new Error(error);
    }
  
  
}


/**
 * Call data file external api
 * @param {String} name 
 * @returns Object
 */
const callFile = (name) => {
    try {
        return  instance.get(`file/${name}`).then( response => response.data);
    } catch (error) {
        throw new Error(error);
    }
}


module.exports={
    GetDataFiles, //Return the list files and content in format JSON
    GetListFiles, //Return the list files
    callFiles,  // Call list files external API
    callFile,   // Call file external API
    formatedData,   //Convert file CSV to JSO
    generateObject, //Create object with key/values
}