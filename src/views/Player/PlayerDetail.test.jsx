import { screen, render } from '@testing-library/react'
import { MemoryRouter, Route } from 'react-router'
import PlayerDetail from './PlayerDetail'

it('should render player detail for Betty Grey', async () => {
    render(<MemoryRouter initialEntries={['/players/12']}>
        <Route path='/players/:id' component={PlayerDetail} />
    </MemoryRouter>)

    screen.getByText('Loading player...')
    const teamName = await screen.findByText('Betty Grey', { exact: false })
    expect(teamName).toBeInTheDocument()
})