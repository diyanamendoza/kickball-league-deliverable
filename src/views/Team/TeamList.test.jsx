import { screen, render } from '@testing-library/react'
import { MemoryRouter, Route } from 'react-router'
import TeamList from './TeamList'

it('should render the team list', async () => {
    render(<MemoryRouter initialEntries={['/teams/']}>
        <Route path='/teams' component={TeamList} />
    </MemoryRouter>)

    screen.getByText('Loading teams...')
    const teamName = await screen.findByText('Bridge City Sneakers', { exact: false })
    expect(teamName).toBeInTheDocument()
})