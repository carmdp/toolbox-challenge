var chai = require('chai');

var listFiles = require('../controllers/filesControllers');


describe('TESTING filesControllers.js', () => {
    describe('Connection external API', () => {
        it('Call list files', async() => {
            const result = await listFiles.callFiles();
        });
        it('Call file', async() => {
            const result = await listFiles.callFile('test2.csv');
        });
    });
    describe('Convert csv to json', () => {
        it('Formatting  to json', () => {
            const string = 'file,text,number,hex\ntest3.csv,HrjlG\ntest3.csv,bBpnxcIEBTicfTdbNxsuhTb,63061464,16bab28a5186aef53ca300e4085fa6de\ntest3.csv,yKz,4,f9f91e549a8c3b448a974c32c35e7fe8\ntest3.csv,CLotXxujqykWkHBIrd,06625798,e590e5f0cd1ad488f224d785231df6f6';

            listFiles.formatedData(string);
              
        });
        it('Array to object key/values', () => {
            const arre1 = ['file','text','number','hex','pp']
            const arre2 = ['test3.csv','bBpnxcIEBTicfTdbNxsuhTb','63061464','16bab28a5186aef53ca300e4085fa6de'];

            listFiles.generateObject(arre1,arre2);  
           
        });
       
    });
    
});