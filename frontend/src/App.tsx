import './App.scss'
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { Converter } from './pages/Converter';
import { Display } from './pages/Display';
import { Theme } from './Theme';
import { Grid, Header, Main, Text } from 'grommet';


function App() {


  return (
    <Theme>
      <Grid fill alignSelf='stretch'>
        <Header 
          direction='row'
          background="dark-1"
          pad={{ vertical:'small', horizontal:'medium' }}>
          <Text size='medium'>h3nr7 . 3Fonts</Text>
        </Header>
        <Main pad='xlarge'>
          <BrowserRouter basename='/'>
            <Routes>
              <Route index element={<Converter />} />
              <Route path='display' element={<Display />} />
            </Routes>
          </BrowserRouter>
        </Main>
      </Grid>
    </Theme>
  )
}

export default App
