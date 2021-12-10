import { render, screen, waitForElementToBeRemoved } from '@testing-library/react';
import { setupServer } from 'msw/node';
import { rest } from 'msw';
import { Route, Router } from 'react-router-dom';
import userEvent from '@testing-library/user-event';
import { createMemoryHistory } from 'history';
import AddTeam from './AddTeam';
import TeamDetail from './TeamDetail';

const mockTeam = {
  id: 16,
  created_at: '2021-12-08T20:26:24.408898+00:00',
  name: 'Fight Club',
  city: 'Richmond',
  state: 'VA',
  players: []
};

const server = setupServer(
  rest.get(
    'https://gpjedlbjswyfiasfelfy.supabase.co/rest/v1/teams',
    (req, res, ctx) => {
      return res(ctx.json(mockTeam));
    }
  ),
  rest.post(
    'https://gpjedlbjswyfiasfelfy.supabase.co/rest/v1/teams',
    (req, res, ctx) => {
      return res(ctx.json([mockTeam]));
    }
  )
);

beforeAll(() => {
  server.listen();
});

afterAll(() => {
  server.close();
});

it('should add a team and redirect to the team detail page', async () => {
  const history = createMemoryHistory();
  history.push('/teams/new');

  render(
    <Router history={history}>
      <Route path='/teams/new'>
        <AddTeam />
      </Route>
      <Route path='/teams/:id' component={TeamDetail} />
    </Router>
  );
  screen.getByText('Add a Team');

  const nameField = screen.getByLabelText(/name/i);
  const cityField = screen.getByLabelText(/city/i);
  const stateField = screen.getByLabelText(/state/i);
  const submitBtn = screen.getByRole('button', { name: 'Add a team' });

  userEvent.type(nameField, 'Fight Club');
  userEvent.type(cityField, 'Richmond');
  userEvent.type(stateField, 'VA');
  userEvent.click(submitBtn);

  await screen.findByText('Loading', { exact: false });
  await waitForElementToBeRemoved(() => screen.queryByText(/loading/i))

  await screen.findByText('Fight Club');
});