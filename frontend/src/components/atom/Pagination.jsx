import React, {useState,useEffect} from 'react';
import {Pagination, Form, Row, Col, InputGroup} from 'react-bootstrap';
import './css/pagination.css';

/**
 * Render component Select - Show Funcion que renderiza el componente para seleccionar catidad de registros a mostrar 
 * @param {Array} listShowFilesByPages   Arreglo con valores numericos
 * @param {Function} handleLimitChange Metodo que retorna valor de limite seleccionado
 * @returns Component
 */
export const PaginationHead = ({listShowFilesByPages, handleLimitChange, handleChangeFilter}) => {
    
    return(<> 
        <Row className="d-flex justify-content-between m-2 py-2  row">
            <Col  xs={6} sm={6} md={6} lg={4} xl={4} className="align-self-center">
                <Form.Label className="mb-0">Mostrar: </Form.Label>
                <Form.Select id="limitFiles" name="limitFiles" onChange={(e) => handleLimitChange(e.target.value)} className="mx-2">
                    {   listShowFilesByPages &&
                            listShowFilesByPages.map( (value,key) => <option value={value} key={key}>{value}</option> )
                    }
                </Form.Select>
                <Form.Label className="mb-0"> archivos. </Form.Label>
            </Col>
            <Col  xs={6} sm={6} md={6} lg={4} xl={4} className="align-self-center">
                <InputGroup>
                    <InputGroup.Text>Filtrar:</InputGroup.Text>
                    <Form.Control
                        id="filterFile" 
                        name="filterFile" 
                        onChange={(e) => handleChangeFilter(e.target.value)} 
                        aria-label="Filtrar: " 
                        placeholder="Ingrese nombre de archivo"
                    />
                </InputGroup>            
            </Col>
        </Row>
    </>)

}


/**
 * Componente de paginacion  para footer de la tabla
 * @param {Number} totalFiles  Cantidad de registros 
 * @param {Number} limitShowFiles  Limite de archivos a mostrar
 * @param {Function} handlePage  Metodo que retorna valor de la pagina actual  
 * @returns Component
 */
export const PaginationFooter = ({totalFiles,limitShowFiles,handlePage}) => {
    
    let initPage = 1;
    
    const [endPage, setEndPage] = useState(calculatePages(totalFiles,limitShowFiles));

    useEffect(()=>{
        setEndPage(calculatePages(totalFiles,limitShowFiles));
    },[totalFiles,limitShowFiles])

    return(<> 
        <Row className="d-flex justify-content-between m-2 py-2 ">
            <Col  xs={6} sm={6} md={6} lg={4} xl={4} className="align-self-center">
                <label>Archivos: {limitShowFiles}/{totalFiles}</label>
            </Col>
            <Col xs={6} sm={6} md={6} lg={3} xl={3} className="d-flex justify-content-end align-self-center">
                <PaginationTable pageStart={initPage} pageCurrent={initPage} pageEnd={endPage} handleCurrentPage={handlePage}/> 
            </Col>
        </Row>
    </>)
}

/**
 * Funcion que renderiza componente pagination  
 * @param {Number} pageStart    Pagina inicial
 * @param {Number} pageCurrent  Pagina actual
 * @param {Number} pageEnd  Ultima pagina  
 * @param {Function} handleCurrentPage  Metodo que retorna la pagina actual
 * @returns Component 
 */
const PaginationTable = ({pageStart,pageCurrent,pageEnd, handleCurrentPage}) => {
    let pages = [];
    const [activeButtons,setActiveButtons] = useState(false);
    const [page,setPage] = useState({
        start: pageStart,
        current: pageCurrent,
        end: pageEnd
    });

  
   
    const handleFirst = () => {
        setPage({
            ...page,
            current: page.start
        })
        
        handleCurrentPage(page.start);
    }
    
    const handlePrev = () => {
       console.log("PREVPAGE",page);

        if (page.current > page.start){
           handleCurrentPage(--page.current);
        }else{
            alert("llego al principio de la paginas")
        }
    }

    const handleNext= () => {
       console.log("NEXTPAGE",page);
        if (page.current < page.end){
            handleCurrentPage(++page.current);
        }else{
            alert("llego al final de la paginas")
        } 
            
    }

    const handleLast = () => {
        setPage({
            ...page,
            current: page.end
        })
        
        handleCurrentPage(page.end);
    }

    const handleChange = (numberPage) =>{
       console.log("CURRENT-PAGE",page);

       setPage({...page, current:numberPage});
       handleCurrentPage(numberPage);
    }

    
    for (let index = 1; index <= pageEnd; index++) {
        pages.push(
            <Pagination.Item 
                active={activePage(page.current,index)} 
                onClick={(e)=>handleChange(index)} 
                key={index}
            >
                {index}
            </Pagination.Item>)
    }



    
    useEffect(()=>{
        if (pageEnd === 1){
            setActiveButtons(true)
        }else{
            setActiveButtons(false)
        }
    },[pageEnd])
    

    return (<>
        <Pagination> 
            <Pagination.First onClick={handleFirst} disabled={activeButtons}/>
            <Pagination.Prev  onClick={handlePrev} disabled={activeButtons}/>
            {pages}
            <Pagination.Next onClick={handleNext} disabled={activeButtons}/>
            <Pagination.Last onClick={handleLast} disabled={activeButtons}/>
        </Pagination> 
    </>)

}



/**
 * Funcion que pinta y activa pagina actual. 
 * @param {Numbre} page Pagina actual donde esta posicionado.
 * @param {Number} index Indice
 * @returns Boolean
 */
function activePage(page,index){
    
    if (page === index){ return true }
    
    return   false;
}


/**
 * Funcion que devuelve cantidad de paginas que tendra la tabla.
 * @param {Number} total  Cantidad de registros obtenidos
 * @param {Number} limit  Limite de registros por paginas
 * @returns Number
 */
function calculatePages(total,limit){
  
    return   Math.ceil(total/limit);

}