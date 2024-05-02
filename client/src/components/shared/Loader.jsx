import Spinner from 'react-bootstrap/Spinner';

function LoadingState() {
 return(
    
        <Spinner
        role='status'
        animation="border" 
        style={{
            width:'100px',
            height:'100px',
            margin: '3rem auto',
            display :'block',
            color:'#00affa'
           
        }}
         ></Spinner>
   
   )
}

export default LoadingState;