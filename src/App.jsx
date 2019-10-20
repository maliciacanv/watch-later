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
  margin-top: 30px;
  padding: 10px;
  border: none;
  background-color: #ffffff8f;
  outline: none;
  border-radius: 20px;
  width: 180px;
  padding-left: 40px;
  ::placeholder {
    color: black;
  }
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
  height: 400px;  
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
  background-image: url("https://i.pinimg.com/originals/59/cc/7e/59cc7e80a5bf8dfb0c959529b9f3e5de.gif");
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

const CloseButton = styled.div`
  display: flex;  
  visibility: visible;
  ${props => !props.dsp && `visibility: hidden;`}
  justify-content: flex-end;
  font-size: 20px;
  padding-right: 15px;
  cursor: pointer;  
  color: white;
  :hover{
    color: red;
  }
`;

const Donate = styled.div`
  padding-top: 10px;
  display: flex;
  justify-content: center;
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
      <Donate>
        <a href="https://www.buymeacoffee.com/49IBUXA" rel="noopener noreferrer" target="_blank">
            <img src="https://bmc-cdn.nyc3.digitaloceanspaces.com/BMC-button-images/custom_images/orange_img.png" alt="Buy Me A Coffee" 
          style={{
              height: 'auto !important',
              width: 'auto !important'
            }}/>
        </a>
      </Donate>              
     <Formik
      initialValues={{ query }}
      onSubmit={(values) => {
        setQuery(values.query)
      }}
    >
      {(formik) => (
        <FormSearch>             
          <Input 
            placeholder="Search an anime ..."
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
            {load && (
              <h1> Carregando </h1>
            )}
        </FormSearch>
      )}
    </Formik>     
    <CloseButton
        dsp={results && true}
        onClick={() => setResults()}>
            x
      </CloseButton>  
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
                    <TextButton 
                    onClick={ () => {console.log(result.title)}}>
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
