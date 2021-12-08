
export default function Player({
    player: { name, position, teams }, showDetail = false,
}) {

    return (
        <article>
            <h3>{name}</h3>
            {showDetail && (
                <>
                    <h4>Position: {position}</h4>
                    <h4>Team: {teams.name}</h4>
                </>
            )}
        </article>
    )
}
