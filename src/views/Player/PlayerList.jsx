import { Link } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { getPlayers } from '../../services/players'
import Player from '../../components/player/Player'

export default function PlayerList() {
    const [players, setPlayers] = useState()
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        getPlayers()
            .then(data => setPlayers(data))
            .finally(() => setLoading(false))
    }, [])

    if(loading) return <h2>Loading players...</h2>

    return (
        <ul className="player-list" aria-label="player list">
        {players.map((player) => (
          <li key={player.id}>
            <Link to={`/players/${player.id}`}>
              <Player player={player} />
            </Link>
          </li>
        ))}
      </ul>
    )
}