import { useParams } from 'react-router-dom'
import { useState } from 'react'
import { useHistory } from 'react-router'
import { updatePlayerById } from '../../services/players'

export default function EditPlayer() {
    const { id, name, position } = useParams()

    const [nameUpdate, setNameUpdate] = useState(name)
    const [positionUpdate, setPositionUpdate] = useState(position)

    const history = useHistory()


    const handleSubmit = async (e) => {
        e.preventDefault()
        const res = await updatePlayerById(id, { name: nameUpdate, position: positionUpdate })
        history.push(`/players/${res[0].id}`)
    }

    return (
        <>
        <fieldset>
            <legend>Update Player Data</legend>
                <form onSubmit={handleSubmit}>
                <label htmlFor='name'>Name:</label>
                <input
                id='name'
                name='name'
                type='text'
                defaultValue={name}
                onChange={({ target }) => setNameUpdate(target.value)}
                />
        
                <label htmlFor='position'>Position:</label>
                <input
                id='position'
                name='position'
                type='text'
                defaultValue={position}
                onChange={({ target }) => setPositionUpdate(target.value)}
                />

                <button type='submit' aria-label='Update player'>
                Update
                </button>
            </form>
        </fieldset>
        </>
    )
}
