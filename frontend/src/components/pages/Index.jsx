import React, {useContext} from 'react';
import {Col } from 'react-bootstrap';
import {GlobalStateContext} from 'context/Contexts';
import Header from 'components/templates/Header';
import ContainerPage from 'components/templates/Container';
import Footer from 'components/templates/Footer';
import {NavbarBrand} from 'components/atom/Navbar';
import {CustomTable} from 'components/atom/Tables';
import Loading from 'components/atom/Loading';


export default function Index() {
    const listFiles = useContext(GlobalStateContext).files;
   
    if(listFiles && listFiles.length > 0){
        return(<>
            <Header>
                <NavbarBrand />
            </Header>
                <ContainerPage>
                    <Col xs={12} sm={12} md={12} lg={12} xl={12} > 
                        
                        <CustomTable files={listFiles} />
                       
                    </Col>
                </ContainerPage>
            <Footer>
                <Col className="text-center"><h6 className="text-white">Desarrollado por Recalde Claudio</h6></Col>
            </Footer>
        </>)
     }else{
        return(
            <>
             <Loading />
            </>
          )
    }
}
