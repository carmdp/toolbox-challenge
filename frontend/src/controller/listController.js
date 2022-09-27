import instance from 'config/Axios';
    

export const GetListFiles = async () => {
  try {
    
    return instance.get('/files/data').then((res) => res);
  
  } catch (error) {

    console.error(error.message)
  
  }    

};
