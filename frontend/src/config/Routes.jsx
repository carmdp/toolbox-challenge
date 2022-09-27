/* ##########  COMPONENTS  ############## */
import React,{useEffect} from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';

/* ##########  URL S  ############## */
import Index from '../components/pages/Index';

export default function Pages() {

  return (<>
    <Routes>
       
      <Route path="/" element={<Index />}/>          
    
    </Routes>
  </>);
}
