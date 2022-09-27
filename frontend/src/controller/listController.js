import conection from 'config/Axios';
    

export const GetListFiles = async () => {
  try {
    
    return conection.get('/files/data').then((res) => res);
  
  } catch (error) {

    console.error(error.message)
  
  }    

};
