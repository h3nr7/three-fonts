import './App.scss'
import { Route, Routes, useLocation, useNavigate } from 'react-router-dom';
import { Converter } from './pages/Converter';
import { Display } from './pages/Display';
import { Theme } from './Theme';
import { Grid, Header, Menu, Text } from 'grommet';
import { ThreeFiber } from './three/ThreeFiber';
import { AppsRounded } from 'grommet-icons'
import {  } from 'react';
import {
  TransitionGroup,
  CSSTransition
} from "react-transition-group";
function App() {

  const navigate = useNavigate();
  const location = useLocation();
  return (
    <Theme>
      <Grid fill alignSelf='stretch' style={{ zIndex: 1, position: 'relative' }}>
        <Header 
          className='navi__container'
          sticky='scrollup'
          direction='row'
          background="dark-1"
          pad={{ vertical:'small', horizontal:'medium' }}>
          <Text size='medium'>h3nr7 . 3Fonts</Text>
          <Menu
            dropProps={{
              align: { top: 'bottom', left: 'left' },
              elevation: 'xlarge',
            }}
            justify='end'
            justifyContent='end'
            icon={false}
            label={<AppsRounded size='14px'/>}
            items={[
              { label: <Item title='Home' />, onClick: () => navigate('/'), size: 'xlarge' },
              { label: <Item title='Font converter' />, onClick: () => navigate('/convert'), size: 'xlarge' },
              { label: <Item title='Font display' />, onClick: () => navigate('/display'), size: 'xlarge' },
            ]}
          />
        </Header>
        <TransitionGroup>
          <CSSTransition
            key={location.pathname}
            classNames="route-css-trans"
            timeout={300}
          >
            <Routes location={location}>
              <Route path='convert' element={<Converter />} />
              <Route index element={<Display />} />
            </Routes>
          </CSSTransition>
        </TransitionGroup>
      </Grid>
      <ThreeFiber />
    </Theme>
  )
}

function Item({title}:{title:string}) {
  return (
    <Text size='small' truncate={true}>{title}</Text>
  )
}

export default App
