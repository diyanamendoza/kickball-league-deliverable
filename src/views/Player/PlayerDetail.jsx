import { Link, useParams } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { getPlayerById } from '../../services/players'
import Player from '../../components/player/Player'

export default function PlayerDetail() {
    const { id } = useParams()
    const [player, setPlayer] = useState()

    useEffect(() => {
        getPlayerById(id).then(data => setPlayer(data))
    }, [id])

    if(!player) return <h3>Loading player...</h3>

    return (
        <>
        <Player player={player} showDetail />
        <Link to="/players" >
          <p>Back to Player List</p>
        </Link>
      </>
    )
}
