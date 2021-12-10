import { render, screen, waitForElementToBeRemoved } from '@testing-library/react';
import { setupServer } from 'msw/node';
import { rest } from 'msw';
import { Route, Router } from 'react-router-dom';
import userEvent from '@testing-library/user-event';
import { createMemoryHistory } from 'history';
import PlayerDetail from './PlayerDetail';
import AddPlayer from './AddPlayer';


const mockPlayer = {
  id: 35,
  created_at: '2021-12-08T20:26:24.408898+00:00',
  name: 'Kamala Harris',
  position: 'Coach',
  team_id: 2,
  teams: {name: 'Dodgers'}
};

const server = setupServer(
  rest.get(
    'https://gpjedlbjswyfiasfelfy.supabase.co/rest/v1/players',
    (req, res, ctx) => {
      return res(ctx.json(mockPlayer));
    }
  ),
  rest.post(
    'https://gpjedlbjswyfiasfelfy.supabase.co/rest/v1/players',
    (req, res, ctx) => {
      return res(ctx.json([mockPlayer]));
    }
  )
);

beforeAll(() => {
  server.listen();
});

afterAll(() => {
  server.close();
});

it('should add a player and redirect to the player detail page', async () => {
  const history = createMemoryHistory();
  history.push('/players/new');

  render(
    <Router history={history}>
      <Route path='/players/new'>
        <AddPlayer />
      </Route>
      <Route path='/players/:id' component={PlayerDetail} />
    </Router>
  );
  screen.getByText('Add a Player');

  const nameField = screen.getByLabelText(/name/i);
  const positionField = screen.getByLabelText(/position/i);
  const teamIdField = screen.getByLabelText(/team id/i);
  const submitBtn = screen.getByRole('button', { name: 'Add a player' });

  userEvent.type(nameField, 'Kamala Harris');
  userEvent.type(positionField, 'Coach');
  userEvent.type(teamIdField, '35');
  userEvent.click(submitBtn);
  
  // await screen.findByText('Loading', { exact: false });
  await waitForElementToBeRemoved(() => screen.queryByText(/loading/i))
  await screen.findByText('Kamala', { exact: false });
});