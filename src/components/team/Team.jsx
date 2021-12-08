import { Link } from 'react-router-dom'

export default function Team({
    team: { name, city, state, players }, showDetail = false,
}) {

    return (
        <article>
            <h3>{name}</h3>
            {showDetail && (
                <>
                    <h4>City: {city}</h4>
                    <h4>State: {state}</h4>
                    <h4>Players:</h4>
                    {players.map(player =>
                        <li key={player.id}><Link to={`/players/${player.id}`}>{player.name}, {player.position}</Link></li> )}
                </>
            )}
        </article>
    )
}
