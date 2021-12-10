export default function PlayerForm({
    name,
    position,
    teamId,
    handleSubmit,
    setName,
    setPosition,
    setTeamId
  }) {
    return (
      <form onSubmit={handleSubmit}>
        <label htmlFor='name'>Name:</label>
        <input
          id='name'
          name='name'
          type='text'
          value={name}
          onChange={({ target }) => setName(target.value)}
        />
  
        <label htmlFor='position'>Position:</label>
        <input
          id='position'
          name='position'
          type='text'
          value={position}
          onChange={({ target }) => setPosition(target.value)}
        />

        <label htmlFor='teamId'>Team ID:</label>
        <input
          id='teamId'
          name='teamId'
          type='text'
          value={teamId}
          onChange={({ target }) => setTeamId(target.value)}
        />
  
        <button type='submit' aria-label='Add a player'>
          Add
        </button>
      </form>
    );
  }