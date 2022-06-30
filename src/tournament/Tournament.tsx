import {useState, useEffect} from "react";
import ChampionsDisplayPanel from './components/ChampionsDisplayPanel';

import PlayerRow from './components/PlayerRow';
import axios from "axios";
function Tournament() {
    const defaultPlayers = [{
        usename:'player001',
        wins:0,
        looses:0,
        logoId:1
    }];
    const saveStateInLocalStorage = () => {
        localStorage.setItem('players', JSON.stringify(players));
    }
    useEffect(()=>{
        if (players !== defaultPlayers){
            saveStateInLocalStorage();
        }

    })
const [players, setPlayers] = useState(defaultPlayers);
    const [championsLibrary, setChampionsLibrary] = useState([
        {id: 'test', value: 'Pense à charger la liste'}
    ])
    const updateChampionsLibrary = function updateChampionsLibrary() {
        axios.get("https://ddragon.leagueoflegends.com/cdn/12.9.1/data/fr_FR/champion.json")
            .then(response => {
                var championsLib = [];
                for (const [key, value] of Object.entries(response.data.data)) {
                    championsLib.push({id: `${key}`, value: `${key}`})
                }
                setChampionsLibrary(championsLib);
            })
            .catch(function (error) {
                // Error
                if (error.response) {
                    // The request was made and the server responded with a status code
                    // that falls out of the range of 2xx
                    // console.log(error.response.data);
                    // console.log(error.response.status);
                    // console.log(error.response.headers);
                } else if (error.request) {
                    // The request was made but no response was received
                    // `error.request` is an instance of XMLHttpRequest in the
                    // browser and an instance of
                    // http.ClientRequest in node.js
                    console.log(error.request);
                } else {
                    // Something happened in setting up the request that triggered an Error
                    console.log('Error', error.message);
                }
                console.log(error.config);
            });
    }

    const updateUsername = function updateUsername(i: number, newUsername: string) {
        // @ts-ignore
        let mapped = players.map((player, index: number) => {
            return index == i ? {...player, username: newUsername} : {...player}
        })

        setPlayers(mapped);
    };

    return (
        <div className="tournament">
            <div className="stream-view">
<ChampionsDisplayPanel/>
                <div className="players-ranking">
                    <PlayerRow></PlayerRow>
                    <PlayerRow></PlayerRow>
                    <PlayerRow></PlayerRow>
                    <PlayerRow></PlayerRow>
                </div>
            </div>
            <div className="config-view">
                <div className="config-container">
                    <div className='action-config'>
                        <div className="config-row">
                            <button>Charger les données A</button>
                        </div>
                        <div className="config-row">
                            <button>Sauvegarder les données A</button>
                        </div>
                        <hr/>
                        <div className="config-row">
                        <button>Charger les données B</button>
                    </div>
                        <div className="config-row">
                            <button>Sauvegarder les données B</button>
                        </div>
                        <hr/>
                        <div className="config-row">
                            <button>Charger les données en local</button>
                        </div>
                        <div className="config-row">
                            <button>Sauvegarder les données en local</button>
                        </div>
                        <hr/>
                        <div className="config-row">
                            <button>Récuperer la sauvegarde locale automatique</button>
                        </div>
                    </div>
                    <div className="classic-config">
                        <h2>Paramètres</h2>
                        <div className="config-row">
                            Points par victoire <input type="text"/>
                        </div>
                        <div className="config-row">
                            Points par défaite <input type="text"/>
                        </div>

                    </div>
                    <div className="champions-config">
                        <h2>Champions</h2>
                        <div className="config-row">
                            Ajouter un champion <input type="text"/>
                        </div>

                    </div>
                    <div className="players-config">
                        <h2>Joueurs</h2>
                        <div className="player-config-row">
                            <div className="row">
                                <span className="username">Player001</span>
                                <button>+Win</button>
                                <button>-Win</button>
                                <button>+Los</button>
                                <button>-Los</button>
                                <span>5 win</span>
                                <span>0 los</span>
                                <span>5 pts</span>
                            </div>
                            <div className="row">
                                <div className='username'>
                                    Pseudo: <input type="text"/>
                                </div>
                                <button>Suppr</button>
                            </div>
                            
                        </div><div className="player-config-row">
                            <div className="row">
                                <span className="username">Player001</span>
                                <button>+Win</button>
                                <button>-Win</button>
                                <button>+Los</button>
                                <button>-Los</button>
                                <span>5 win</span>
                                <span>0 los</span>
                                <span>5 pts</span>
                            </div>
                            <div className="row">
                                <div className='username'>
                                    Pseudo: <input type="text"/>
                                </div>
                                <button>Suppr</button>
                            </div>

                        </div><div className="player-config-row">
                            <div className="row">
                                <span className="username">Player001</span>
                                <button>+Win</button>
                                <button>-Win</button>
                                <button>+Los</button>
                                <button>-Los</button>
                                <span>5 win</span>
                                <span>0 los</span>
                                <span>5 pts</span>
                            </div>
                            <div className="row">
                                <div className='username'>
                                    Pseudo: <input type="text"/>
                                </div>
                                <button>Suppr</button>
                            </div>

                        </div><div className="player-config-row">
                            <div className="row">
                                <span className="username">Player001</span>
                                <button>+Win</button>
                                <button>-Win</button>
                                <button>+Los</button>
                                <button>-Los</button>
                                <span>5 win</span>
                                <span>0 los</span>
                                <span>5 pts</span>
                            </div>
                            <div className="row">
                                <div className='username'>
                                    Pseudo: <input type="text"/>
                                </div>
                                <button>Suppr</button>
                            </div>

                        </div><div className="player-config-row">
                            <div className="row">
                                <span className="username">Player001</span>
                                <button>+Win</button>
                                <button>-Win</button>
                                <button>+Los</button>
                                <button>-Los</button>
                                <span>5 win</span>
                                <span>0 los</span>
                                <span>5 pts</span>
                            </div>
                            <div className="row">
                                <div className='username'>
                                    Pseudo: <input type="text"/>
                                </div>
                                <button>Suppr</button>
                            </div>

                        </div><div className="player-config-row">
                            <div className="row">
                                <span className="username">Player001</span>
                                <button>+Win</button>
                                <button>-Win</button>
                                <button>+Los</button>
                                <button>-Los</button>
                                <span>5 win</span>
                                <span>0 los</span>
                                <span>5 pts</span>
                            </div>
                            <div className="row">
                                <div className='username'>
                                    Pseudo: <input type="text"/>
                                </div>
                                <button>Suppr</button>
                            </div>

                        </div><div className="player-config-row">
                            <div className="row">
                                <span className="username">Player001</span>
                                <button>+Win</button>
                                <button>-Win</button>
                                <button>+Los</button>
                                <button>-Los</button>
                                <span>5 win</span>
                                <span>0 los</span>
                                <span>5 pts</span>
                            </div>
                            <div className="row">
                                <div className='username'>
                                    Pseudo: <input type="text"/>
                                </div>
                                <button>Suppr</button>
                            </div>

                        </div><div className="player-config-row">
                            <div className="row">
                                <span className="username">Player001</span>
                                <button>+Win</button>
                                <button>-Win</button>
                                <button>+Los</button>
                                <button>-Los</button>
                                <span>5 win</span>
                                <span>0 los</span>
                                <span>5 pts</span>
                            </div>
                            <div className="row">
                                <div className='username'>
                                    Pseudo: <input type="text"/>
                                </div>
                                <button>Suppr</button>
                            </div>

                        </div><div className="player-config-row">
                            <div className="row">
                                <span className="username">Player001</span>
                                <button>+Win</button>
                                <button>-Win</button>
                                <button>+Los</button>
                                <button>-Los</button>
                                <span>5 win</span>
                                <span>0 los</span>
                                <span>5 pts</span>
                            </div>
                            <div className="row">
                                <div className='username'>
                                    Pseudo: <input type="text"/>
                                </div>
                                <button>Suppr</button>
                            </div>

                        </div>
                    </div>
                </div>

            </div>
        </div>
    );
}
export default Tournament;