import { useState } from 'react'
import { useHistory } from 'react-router'
import PlayerForm from '../../components/player/PlayerForm'
import { createPlayer } from '../../services/players'

export default function AddPlayer() {
    const [name, setName] = useState('')
    const [position, setPosition] = useState('')
    const [teamId, setTeamId] = useState('')
    const history = useHistory()

    const handleSubmit = async (e) => {
        e.preventDefault()
        const res = await createPlayer({ name, position, teamId })
        // console.log(res)
        history.push(`/players/${res[0].id}`)
    }

    return (
        <>
        <fieldset>
            <legend>Add a Player</legend>
            <PlayerForm
                name={name}
                position={position}
                teamId={teamId}
                handleSubmit={handleSubmit}
                setName={setName}
                setPosition={setPosition}
                setTeamId={setTeamId}
            />
        </fieldset>
        </>
    )
}
