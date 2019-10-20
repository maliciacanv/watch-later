import React, { useState, useEffect} from 'react';
import { Formik, Form, Field } from 'formik';
import styled from 'styled-components';
import searchAnime from './requests';
import './App.css';


const Input = styled(Field)`
  display: flex;
  justify-self: center;
  margin-top: 10px;
  width: 80%;
`;

const Img = styled.img ` 
  border-radius: 10px;
  width: 100%;  
`;

const Grid = styled.div`
  padding-top: 10px;
  display: grid;
  width: 100%;
  margin: 0 auto;  
  grid-template-columns: repeat(2, 1fr);  
  grid-gap: 12px;
  height: 500px;  
  overflow: auto;
  ::-webkit-scrollbar
  {
    width: 5px;
    background-color: #F5F5F5;
  }
  ::-webkit-scrollbar-thumb
  {
    border-radius: 10px;
    -webkit-box-shadow: inset 0 0 6px rgba(0,0,0,.3);
    background-color: #D62929;
  }
`;

function App() {
  const [query, setQuery] = useState();
  const [load, setLoad] = useState();
  const [results, setResults] = useState();
  useEffect(() => {
    if(query !== undefined) {
      searchAnime(query)
      .then(response => {
        setLoad(true);
        setResults();
        setResults(response.data.results);
      })
      .finally(() => setLoad(false));
    }
  }, [query]);
  

  return (
    <div className="Container"> 
     <Formik
      initialValues={{ query: ''}}
      onSubmit={(values) => {
        setQuery(values.query)
      }}
    >
      {(formik) => (
        <Form>
          <Input 
            type="query" 
            name="query" 
            onChange={event => {
              formik.setFieldValue('query', event.target.value)
              //setQuery(formik.values.query)
            }}/>
        </Form>
      )}
    </Formik> 
    {load && (
      <h1> Carregando </h1>
    )}
    <Grid>
      {!load && (
        <>
          {results && (
            results.map(result => {
              console.log(result)
              return (
                <Img src={result.image_url}/>
              )
            })
          )}
        </>
      )}    
    </Grid>    
    </div>
  );
}

export default App;
