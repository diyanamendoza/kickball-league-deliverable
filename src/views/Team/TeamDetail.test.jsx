import { screen, render } from '@testing-library/react'
import { MemoryRouter, Route } from 'react-router'
import TeamDetail from './TeamDetail'

it('should render the team detail for Bridge', async () => {
    render(<MemoryRouter initialEntries={['/teams/1']}>
        <Route path='/teams/:id' component={TeamDetail} />
    </MemoryRouter>)

    screen.getByText('Loading team...')
    const teamName = await screen.findByText('Bridge City Sneakers', { exact: false })
    expect(teamName).toBeInTheDocument()
})