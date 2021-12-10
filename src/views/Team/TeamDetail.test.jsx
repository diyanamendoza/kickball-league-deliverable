import { render, screen, waitForElementToBeRemoved } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { setupServer } from 'msw/node';
import { rest } from 'msw';
import TeamDetail from './TeamDetail';

const mockTeam1 = {
  id: 30,
  created_at: '2021-12-08T20:26:24.408898+00:00',
  name: 'Mulan',
  city: 'San Francisco',
  state: 'CA',
  players: [],
};

const server = setupServer(
  rest.get('https://gpjedlbjswyfiasfelfy.supabase.co/rest/v1/teams', (req, res, ctx) => {
    return res(ctx.json(mockTeam1))
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
      <TeamDetail
        match={{ params: { teamId: '30' } }}
      />
    </MemoryRouter>
  );

  screen.getByText('Loading team...');
  await waitForElementToBeRemoved(() => screen.queryByText(/loading/i))


  const teamName = await screen.findByText('Mulan', {
    exact: false,
  });

  expect(teamName).toBeInTheDocument();
});