
// @ts-ignore
function ChampionsDisplayPanel({champions, removeChampion}) {

    return (
        <div className="champions-panel">
            <div className="panel-name">
                <span>Champions joués:</span>
            </div>
            <br/>
            <div className="champions-display">
                <div className="champions-number">
                    <span className="number">{champions.length}</span>
                    <span className='text'>champions</span>
                </div>
                <div className="champions-list">
                    {champions.map((champion:object, index:number)=>{
                        // @ts-ignore
                        return (
                            <div className="champion" onClick={()=>{
                                // @ts-ignore
                                removeChampion(champion.id)}}> <img src={"http://ddragon.leagueoflegends.com/cdn/12.12.1/img/champion/"+champion.id+".png"} alt=""/>
                            </div>
                        )
                    })}
                </div>
            </div>

        </div>
    );
}
export default ChampionsDisplayPanel;