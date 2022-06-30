
import ChampionsDisplayPanel from './components/ChampionsDisplayPanel';

import PlayerRow from './components/PlayerRow';
function Tournament() {

    return (
        <div className="tournament">
            <div className="stream-view">
<ChampionsDisplayPanel/>
                <div className="players-ranking">
                    <PlayerRow></PlayerRow>
                    <PlayerRow></PlayerRow>
                    <PlayerRow></PlayerRow><PlayerRow></PlayerRow>
                    <PlayerRow></PlayerRow>
                    <PlayerRow></PlayerRow><PlayerRow></PlayerRow>
                    <PlayerRow></PlayerRow>
                    <PlayerRow></PlayerRow><PlayerRow></PlayerRow>
                    <PlayerRow></PlayerRow>
                    <PlayerRow></PlayerRow><PlayerRow></PlayerRow>
                    <PlayerRow></PlayerRow>
                    <PlayerRow></PlayerRow>
                    <PlayerRow></PlayerRow>
                    <PlayerRow></PlayerRow>
                    <PlayerRow></PlayerRow>
                </div>
            </div>
            <div className="config-view">

            </div>
        </div>
    );
}
export default Tournament;