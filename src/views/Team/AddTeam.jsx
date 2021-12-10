import { useState } from 'react'
import { createTeam } from '../../services/teams'
import { useHistory } from 'react-router'
import TeamForm from '../../components/team/TeamForm'

export default function AddTeam() {
    const [name, setName] = useState('')
    const [city, setCity] = useState('')
    const [state, setState] = useState('')
    const history = useHistory()

    const handleSubmit = async (e) => {
        e.preventDefault()
        const res = await createTeam({ name, city, state })
        // console.log(res)
        history.push(`/teams/${res[0].id}`)
    }

    return (
        <>
        <fieldset>
            <legend>Add a Team</legend>
            <TeamForm
                name={name}
                city={city}
                state={state}
                handleSubmit={handleSubmit}
                setName={setName}
                setCity={setCity}
                setState={setState}
            />
        </fieldset>
        </>
    )
}
