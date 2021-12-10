import { render, screen, waitForElementToBeRemoved } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { setupServer } from 'msw/node';
import { rest } from 'msw';
import PlayerDetail from './PlayerDetail';

const mockPlayer = {
  id: 30,
  created_at: '2021-12-08T20:26:24.408898+00:00',
  name: 'Priscilla Ahn',
  position: 'Pitcher',
  team_id: 1,
  teams: {name: 'Dodgers'}
};

const server = setupServer(
  rest.get('https://gpjedlbjswyfiasfelfy.supabase.co/rest/v1/players', (req, res, ctx) => {
    return res(ctx.json(mockPlayer))
  })
);

beforeAll(() => {
  server.listen();
});

afterAll(() => {
  server.close();
});

it('should render a detailed view of an individual team', async () => {
  render(
    <MemoryRouter>
      <PlayerDetail
        match={{ params: { id: 30 } }}
      />
    </MemoryRouter>
  );

  await screen.findByText('Loading', { exact: false });
  await waitForElementToBeRemoved(() => screen.queryByText(/loading/i))

  const playerName = await screen.findByText('Priscilla Ahn', { exact: false });

  expect(playerName).toBeInTheDocument();
});