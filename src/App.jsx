/* eslint-disable jsx-a11y/accessible-emoji */
import React, { useState, useEffect} from 'react';
import { Formik, Form, Field } from 'formik';
import styled from 'styled-components';
import searchAnime from './requests';
import './App.css';


const FormSearch = styled(Form) `
  display: flex;
  justify-content: center;
`;

const Input = styled(Field)`
  margin-top: 50px;
  padding: 10px;
  border: none;
  background-color: #ffffff8f;
  outline: none;
  border-radius: 20px;
  width: 160px;
  padding-left: 40px;
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
  overflow-x: hidden;
  ::-webkit-scrollbar
  {
    width: 5px;
    background-color: #F5F5F5;
  }
  ::-webkit-scrollbar-thumb
  {
    border-radius: 10px;
    box-shadow: inset 0 0 6px rgba(0,0,0,.3);
    background-color: #b329d6;
  }
`;

const Container = styled.div`
  width: 300px;
  height: 600px;
  background-image: url('http://giphygifs.s3.amazonaws.com/media/13ZzYXkeIjcZy0/giphy.gif');
  background-size: cover;
  background-repeat: no-repeat;
  background-position: center center;
`;

const Main = styled.div`
  margin-bottom: -100px;
`;

const DetailCard = styled.div`
  width: 100px;  
  background-color: #ffffffd4;
  padding-left: 22px;  
  padding-right: 20px;  
  padding-top: -1px;  
  border-radius: 10px;
`;

const Text = styled.p`
  font-family: inherit;
  font-size: 12px;
  margin-bottom: -5px;
`;

const TextButton = styled.p`
  font-family: inherit;
  font-size: 12px;
  cursor: pointer;
  padding-top: 60px;
  :hover{
    color: green;
  }
`;

function App() {
  const [query, setQuery] = useState();
  const [load, setLoad] = useState();
  const [results, setResults] = useState();
  useEffect(() => {
    window.localStorage.setItem('list', JSON.stringify([{a:'aaa'},{b:'bbb'}]))    
    console.log(window.localStorage.getItem('list'))
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
    <Main>
    <Container> 
     <Formik
      initialValues={{ query: ''}}
      onSubmit={(values) => {
        setQuery(values.query)
      }}
    >
      {(formik) => (
        <FormSearch>
          <Input 
            type="query" 
            name="query" 
            onChange={event => {
              formik.setFieldValue('query', event.target.value)
              //setQuery(formik.values.query)
              if(event.target.value === '' 
              || event.target.value === null
              || event.target.value === undefined) {
                setResults();
              }
            }}/>
        </FormSearch>
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
              return (
                <React.Fragment key={result.mal_id}>
                  <Img src={result.image_url}/>
                  <DetailCard> 
                    <Text>{result.title}</Text>
                    <Text>Score: {result.score} ⭐</Text>                
                    <Text>Episodes: {result.episodes}</Text>                  
                    {result.rated === 'Rx' && (
                      <Text>18 + 😈</Text>
                    )}
                    <TextButton>
                    💻 Watch Later
                    </TextButton>
                  </DetailCard>
                </React.Fragment>
              )
            })
          )}
        </>
      )}    
    </Grid>    
    </Container>
    </Main>
  );
}

export default App;
