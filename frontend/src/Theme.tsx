import { PropsWithChildren } from 'react';
import { Grommet, ThemeType } from 'grommet';


export function Theme({ children }:PropsWithChildren) {

  const theme:ThemeType = {
    global: {
      font: {
        family: 'rift-soft',
        size: '14px'
      }
    }
  }

  return (
    <Grommet theme={theme}>
      {children}
    </Grommet>
  )
}