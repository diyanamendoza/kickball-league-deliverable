import { Link } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { deletePlayerById, getPlayers } from '../../services/players'
import Player from '../../components/player/Player'

export default function PlayerList() {
    const [players, setPlayers] = useState()
    const [loading, setLoading] = useState(true)

    const loadPlayers = async () => {
      setLoading(true)
      const res = await getPlayers()
      setPlayers(res)
      setLoading(false)
    }

    useEffect(() => {
      loadPlayers()
    }, [])

    const handleDelete = async ({ id, playerName }) => {
      const confirmDialog = window.confirm(`Click OK to delete ${playerName}`)
      if(confirmDialog) {
        await deletePlayerById(id)
        await loadPlayers()
      }
    }

    if(loading) return <h2>Loading players...</h2>

    return (
      <>
      <h1>Players</h1>
      <Link to="/players/new" className="App-link">
        Add a Player
      </Link>
        <ul className="player-list" aria-label="player list">
        {players.map((player) => (
          <li key={player.id}>
            <Link to={`/players/${player.id}`}>
              <Player player={player} />
            </Link>
            <div className='admin-buttons'>
              <Link to={`/players/update/${player.id}&${player.name}&${player.position}`}><button type ='button' aria-label={`Edit ${player.name}`} >Edit</button></Link>
              <button type ='button' aria-label={`Delete ${player.name}`} onClick={() => handleDelete({ id: player.id, playerName: player.name })}>Delete</button>
            </div>
          </li>
        ))}
      </ul>
      </>
    )
}