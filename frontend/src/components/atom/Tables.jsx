import React, {useState,useEffect} from 'react';
import {Table} from 'react-bootstrap';
import {PaginationHead, PaginationFooter} from 'components/atom/Pagination';
import './css/tables.css'

export const CustomTable = ({files}) => {
    
    let listShowFilesByPages = [1,3,5];
  
    const [limitShowFiles,setLimitShowFiles] = useState(listShowFilesByPages[0]);
    const [page,setPage]=useState(1);
    const [posStartArreFiles, setPosStartArreFiles] =useState(0);
    const [posEndArreFiles, setPosEndArreFiles] =useState(limitShowFiles);
    

    const handleChangeLimitShowFiles = (value) =>{ 
        setLimitShowFiles(value);   
    }

    const handleChangeCurrentPage = (page) =>{ 
        setPage(page);
    }

    useEffect(()=>{
        setPosEndArreFiles(limitShowFiles*page);
        setPosStartArreFiles((limitShowFiles*page)-limitShowFiles)
    },[page,limitShowFiles])

    return (<>
            <PaginationHead 
                listShowFilesByPages={listShowFilesByPages} 
                handleLimitChange={handleChangeLimitShowFiles} 
            />

            {renderTable(files.slice(posStartArreFiles,posEndArreFiles))}
            
            <PaginationFooter
                limitShowFiles={limitShowFiles} 
                totalFiles={files.length} 
                handlePage={handleChangeCurrentPage}
            />
    </>);
   
}

function renderTable (obj) {
    return(
        <Table striped bordered hover responsive>
            <thead>
                <tr>
                    <th>File Name</th>
                    <th>Text</th>
                    <th>Number</th>
                    <th>Hex</th>
                </tr>
            </thead>
            <tbody>
                {
                        obj.map((data) => (

                            data.lines.map( (row, k) =>(
                                <tr key={k}>
                                    <td>{data.file}</td>
                                    <td>{row.text}</td>
                                    <td>{row.number}</td>
                                    <td>{row.hex}</td>
                                </tr>
                            ))

                        ))
                }
            </tbody>
        </Table>
    )
}


