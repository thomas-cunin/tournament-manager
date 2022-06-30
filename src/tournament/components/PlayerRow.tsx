// @ts-ignore
function PlayerRow({player, index, fct}) {
    return (
        <div onClick={()=>{fct.setFocusedPlayer(index)}} className={"player-row "}>
            <div className="rank-number"><span>#{index+1}</span></div>
            <div className="icon"></div>
            <div className="username"><span>{player.username}</span></div>
            <div></div>
            <div></div>
            <div></div>
            <div className="number"><span>{player.wins} W</span></div>
            <div className="number"><span>{player.looses} L</span></div>
            <div className="number"><span>{fct.getPoints(player)} pts</span></div>
        </div>
    )
}

export default PlayerRow;