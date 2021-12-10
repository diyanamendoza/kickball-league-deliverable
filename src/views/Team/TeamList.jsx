import { Link } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { deleteTeamById, getTeams } from '../../services/teams'
import Team from '../../components/team/Team'

export default function TeamList() {
    const [teams, setTeams] = useState()
    const [loading, setLoading] = useState(true)

    const loadTeams = async () => {
      setLoading(true)
      const res = await getTeams()
      setTeams(res)
      setLoading(false)
    }

    useEffect(() => {
      loadTeams()
    }, [])

    const handleDelete = async ({ id, teamName }) => {
      const confirmDialog = window.confirm(`Click OK to delete ${teamName}`)
      if(confirmDialog) {
        await deleteTeamById(id)
        await loadTeams()
      }
    }

    if(loading) return <h2>Loading teams...</h2>

    return (
      <>
        <h1>Teams</h1>
        <Link to="/teams/new" className="App-link">
        Add a Team
      </Link>
        <ul className="team-list" aria-label="team list">
        {teams.map((team) => (
          <li key={team.id}>
            <Link to={`/teams/${team.id}`}>
              <Team team={team} />
            </Link>
            <div className='admin-buttons'>
              <Link to={`/teams/update/${team.id}`}><button type ='button' aria-label={`Edit ${team.name}`} >Edit</button></Link>
              <button type ='button' aria-label={`Delete ${team.name}`} onClick={() => handleDelete({ id: team.id, teamName: team.name })}>Delete</button>
            </div>
          </li>
        ))}
      </ul>
      </>
    )
}
