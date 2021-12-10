import { render, screen } from '@testing-library/react';
import { setupServer } from 'msw/node';
import { rest } from 'msw';
import { Route, Router } from 'react-router-dom';
import userEvent from '@testing-library/user-event';
import { createMemoryHistory } from 'history';
import TeamDetail from './TeamDetail';
import EditTeam from './EditTeam';

const mockTeam = {
  id: 100,
  created_at: '2021-12-08T20:26:24.408898+00:00',
  name: 'Motorcycle Diaries',
  city: 'New York',
  state: 'NY',
  players: []
};

const server = setupServer(
  rest.get(
    'https://gpjedlbjswyfiasfelfy.supabase.co/rest/v1/teams',
    (req, res, ctx) => {
      return res(ctx.json(mockTeam));
    }
  ),
  rest.patch(
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

it('should update a team and redirect to the team detail page', async () => {
  const history = createMemoryHistory();
  history.push('/teams/update/:id');

  render(
    <Router history={history}>
      <Route exact path='/teams/update/:id'>
        <EditTeam />
      </Route>
      <Route exact path='/teams/:id' component={TeamDetail} />
    </Router>
  );
  
  // screen.debug()
  await screen.getByText('Update Team Data', { exact: false });

  const nameField = screen.getByLabelText(/name/i);
  const cityField = screen.getByLabelText(/city/i);
  const stateField = screen.getByLabelText(/state/i);
  const submitBtn = screen.getByRole('button', { name: 'Update team' });

  userEvent.type(nameField, 'Motorcycle Diaries');
  userEvent.type(cityField, 'New York');
  userEvent.type(stateField, 'NY');
  userEvent.click(submitBtn);
  // screen.debug()
  await screen.findByText('Loading', { exact: false });
  // await waitForElementToBeRemoved(() => screen.queryByText(/loading/i))


  await screen.findByText('Motorcycle Diaries', { exact: false });
});