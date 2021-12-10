import { useParams } from 'react-router-dom'
import { useState, useEffect } from 'react'
import { useHistory } from 'react-router'
import { getTeamById, updateTeamById } from '../../services/teams'

export default function EditTeam() {
    const { id } = useParams()
    const [team, setTeam] = useState('')
    const { name, city, state } = team 

    useEffect(() => {
        getTeamById(id).then(data => setTeam(data))
    }, [id])

    const [nameUpdate, setNameUpdate] = useState(name)
    const [cityUpdate, setCityUpdate] = useState(city)
    const [stateUpdate , setStateUpdate] = useState(state)

    const history = useHistory()

    const handleSubmit = async (e) => {
        e.preventDefault()
        // console.log(id, team, nameUpdate)
        await updateTeamById(id, {name: nameUpdate, city: cityUpdate, state: stateUpdate })
        history.push(`/teams/${id}`)
    }

    return (
        <>
        <fieldset>
            <legend>Update Team Data</legend>
                <form onSubmit={handleSubmit}>
                <label htmlFor='name'>Name:</label>
                <input
                id='name'
                name='name'
                type='text'
                defaultValue={name}
                onChange={({ target }) => setNameUpdate(target.value)}
                />
        
                <label htmlFor='city'>City:</label>
                <input
                id='city'
                name='city'
                type='text'
                defaultValue={city}
                onChange={({ target }) => setCityUpdate(target.value)}
                />

                <label htmlFor='state'>State:</label>
                <input
                id='state'
                name='state'
                type='text'
                defaultValue={state}
                onChange={({ target }) => setStateUpdate(target.value)}
                />

                <button type='submit' aria-label='Update team'>
                Update
                </button>
            </form>
        </fieldset>
        </>
    )
}
