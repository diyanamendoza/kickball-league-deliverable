import { Link } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { getTeams } from '../../services/teams'
import Team from '../../components/team/Team'

export default function TeamList() {
    const [teams, setTeams] = useState()
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        getTeams()
            .then(data => setTeams(data))
            .finally(() => setLoading(false))
    }, [])

    if(loading) return <h2>Loading teams...</h2>

    return (
        <ul className="team-list" aria-label="team list">
        {teams.map((team) => (
          <li key={team.id}>
            <Link to={`/teams/${team.id}`}>
              <Team team={team} />
            </Link>
          </li>
        ))}
      </ul>
    )
}
