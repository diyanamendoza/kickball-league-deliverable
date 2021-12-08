import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import './App.css';
import Home from './views/Home/Home'
import TeamList from './views/Team/TeamList'
import TeamDetail from './views/Team/TeamDetail'
import PlayerList from './views/Player/PlayerList'
import PlayerDetail from './views/Player/PlayerDetail'
import Header from './components/layout/Header';

function App() {
  return (
    <main className="container">
      <Router>
        <Header />
        <Switch>
          <Route exact path="/">
            <Home />
          </Route>
          <Route exact path="/teams">
            <TeamList />
          </Route>
          <Route exact path="/teams/:id">
            <TeamDetail />
          </Route>
          <Route exact path="/players">
            <PlayerList />
          </Route>
          <Route exact path="/players/:id">
            <PlayerDetail />
          </Route>
        </Switch>
      </Router>
    </main>
  )
}

export default App;
