import { Link, useParams } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { getTeamById } from '../../services/teams'
import Team from '../../components/team/Team'

export default function TeamDetail() {
    const { id } = useParams()
    const [team, setTeam] = useState()

    useEffect(() => {
        getTeamById(id).then(data => setTeam(data))
    }, [id])

    if(!team) return <h3>Loading team...</h3>
    return (
        <>
        <Team team={team} showDetail />
        <Link to="/teams" >
          <p>Back to Team List</p>
        </Link>
      </>
    )
}
