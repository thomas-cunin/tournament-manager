// Import the functions you need from the SDKs you need
import {initializeApp} from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
import {getDatabase, ref, set, onValue} from "firebase/database";


import {useState, useEffect} from "react";
import ChampionsDisplayPanel from './components/ChampionsDisplayPanel';

import PlayerRow from './components/PlayerRow';
import axios from "axios";
import DatalistInput, {useComboboxControls} from "react-datalist-input";

// @ts-ignore
function PlayerConfigRow({index, player, fct, isFocus}) {
    return (
        <div className={isFocus ? "player-config-row focused":"player-config-row"}>
            <div className="row">
                <span className="username">{player.username}</span>
                <button onClick={()=>{fct.addWin(index)}}>+Win</button>
                <button onClick={()=>{fct.removeWin(index)}}>-Win</button>
                <button onClick={()=>{fct.addLoose(index)}}>+Los</button>
                <button onClick={()=>{fct.removeLoose(index)}}>-Los</button>
                <span>{player.wins} win</span>
                <span>{player.looses} los</span>
                <span>5 pts</span>
            </div>
            <div className="row">
                <div className='username'>
                    Pseudo: <input value={player.username} type="text" onChange={(e)=>{fct.updateUsername(index, e.target.value)}}/>
                </div>
                <button onClick={()=>{fct.removePlayer(index)}}>Suppr</button>
            </div>

        </div>
    )
}

function Tournament() {
    const { setValue, value } = useComboboxControls({ isExpanded:false,initialValue: '' });
    // Your web app's Firebase configuration
    const firebaseConfig = {
        apiKey: "AIzaSyDBdW7TM8Mxl9iEiAARBg_BLutUSvGCKRU",
        authDomain: "lol-tournament-manager.firebaseapp.com",
        projectId: "lol-tournament-manager",
        storageBucket: "lol-tournament-manager.appspot.com",
        messagingSenderId: "961827875102",
        appId: "1:961827875102:web:8ad19de94472ec27c7c10f"
    };

// Initialize Firebase
    const fireApp = initializeApp(firebaseConfig);
    const database = getDatabase(fireApp,'https://lol-tournament-manager-default-rtdb.europe-west1.firebasedatabase.app/');
    const getPlayersInDB = (index: string) => {
        const dataRef = ref(database, 'data/' + index);
        onValue(dataRef, (snapshot) => {
            const data = snapshot.val();
            setPlayers(data);
        });
    }
    const registerPlayersInDB = (index: string) => {
        set(ref(database, 'data/' + index), players);
    }


    const defaultPlayers = [{
        username: 'player001',
        wins: 0,
        looses: 0,
        logoId: 1
    }];
    const saveStateInLocalStorage = () => {
        localStorage.setItem('players', JSON.stringify(players));
        localStorage.setItem('config', JSON.stringify(configuration));
    }
    useEffect(() => {
        if (players !== defaultPlayers) {
            saveStateInLocalStorage();
        }

    })
    const [usedChampions, setUsedChampions] = useState([
        {id:'Aatrox', value:'Aatrox'}
    ])
    const removeChampion =  function removeChampion(id:string){
        let data = usedChampions.filter((champion, index)=>{return champion.id !== id})
        setUsedChampions(data);
    };
    const addChampion = function addChampion(id:string) {
        const newChampion = {
            id:id,
            value:id
        };
        setUsedChampions(usedChampions.concat(newChampion));
    }
    const [configuration, setCOnfiguration] = useState({
        wp:2,
        lp:0,
        backgroundColor:'#FFFFFF'
    })
    const [players, setPlayers] = useState(defaultPlayers);
    const [championsLibrary, setChampionsLibrary] = useState([
        {id: 'test', value: 'Pense à Récuperer la liste'}
    ])
    const [focusedPlayer, setFocusedPlayer] = useState(99)
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


// Functions of child
    const fct = {
        updateUsername: function updateUsername(i: number, newUsername: string) {
            // @ts-ignore
            let mapped = players.map((player, index: number) => {
                return index == i ? {...player, username: newUsername} : {...player}
            })

            setPlayers(mapped);
        },
            addWin: function addWin(i:number) {
                // @ts-ignore
                let mapped = players.map((player, index: number) => {
                    return index == i ? {...player, wins: player.wins + 1} : {...player}
                })
                setPlayers(mapped);
            },
            removeWin : function removeWin(i:number) {
                let mapped = players.map((player, index: number) => {
                    return index == i ? {...player, wins: player.wins - 1} : {...player}
                })
                setPlayers(mapped);
            },
            addLoose : function addLoose(i:number) {
                // @ts-ignore
                let mapped = players.map((player, index: number) => {
                    return index == i ? {...player, looses: player.looses + 1} : {...player}
                })
                setPlayers(mapped);
            },
            removeLoose : function removeLoose(i:number) {
                let mapped = players.map((player, index: number) => {
                    return index == i ? {...player, looses: player.looses - 1} : {...player}
                })
                setPlayers(mapped);
            },
            removePlayer : (i:number)=>{
                let data = players.filter((player, index)=>{return index !== i})
                setPlayers(data);
            },
            // @ts-ignore
             getPoints : (playerObject) => {
                let calc = playerObject.wins * configuration.wp;
                calc+= playerObject.looses * configuration.lp;
                return calc;
            },
        setFocusedPlayer:(i:number)=>{
            setFocusedPlayer(i);
        }
    }
    ;

    const getDataFromSave = () => {
        if (localStorage.getItem('players')){
            // @ts-ignore
            setPlayers(JSON.parse(localStorage.getItem('players')))
        }
        if(localStorage.getItem('config')){
            // @ts-ignore
            setCOnfiguration(JSON.parse(localStorage.getItem('config')))
        }
    }

    // functions of configuration
    function addPlayer(uname: string) {
        const newPlayer = {
            username: 'PLAYER00'+players.length,
            wins:0,
            looses:0,
            logoId:1
        };
        setPlayers(players.concat(newPlayer));
    }
    const reloadRanking = ()=>{
        let sorted = [...players].sort((a, b) => (fct.getPoints(a) < fct.getPoints(b)) ? 1 : -1);
        setPlayers(sorted);
    }
    return (
        <div className="tournament">
            <div className="stream-view">
                <ChampionsDisplayPanel champions={usedChampions} removeChampion={removeChampion}/>
                <div className="players-ranking">
                    {players.map((player:object,index:number)=>{
                        return <PlayerRow player={player} fct={fct} index={index} key={index} ></PlayerRow>
                    })}

                </div>
            </div>
            <div className="config-view">
                <div className="config-container">
                    <div className='action-config'>
                        <div className="config-row">
                            <div className="config-row">
                                <button onClick={() => {
                                    registerPlayersInDB('A')
                                }}>Sauvegarder les données A
                                </button>
                            </div>
                            <div className="config-row">
                                <button onClick={() => {
                                    registerPlayersInDB('B')
                                }}>Sauvegarder les données B
                                </button>
                            </div>
                            <div className="config-row">
                                <button onClick={() => {
                                    registerPlayersInDB('C')
                                }}>Sauvegarder les données C
                                </button>
                            </div>
                            <hr/>
                            <button onClick={() => {
                                getPlayersInDB('A')
                            }}>Récuperer les données A
                            </button>
                        </div>
                        <div className="config-row">
                        <button onClick={() => {
                            getPlayersInDB('B')
                        }}>Récuperer les données B
                        </button>
                    </div>
                        <div className="config-row">
                            <button onClick={() => {
                                getPlayersInDB('C')
                            }}>Récuperer les données C
                            </button>
                        </div>

                        <hr/>

                        <div className="config-row" onClick={getDataFromSave}>
                            <button>Récuperer la sauvegarde locale automatique</button>
                        </div>
                    </div>
                    <div className="classic-config">
                        <h2>Paramètres</h2>
                        <div className="config-row">
                            Points par victoire <input value={configuration.wp} type="text"/>
                        </div>
                        <div className="config-row">
                            Points par défaite <input value={configuration.lp} type="text"/>
                        </div>
                        <div className="config-row">
                            Couleur de fond: <input type="text" value={configuration.backgroundColor} onChange={(e)=>{setCOnfiguration({...configuration, backgroundColor: e.target.value});
                            // @ts-ignore
                            document.querySelector('body').style.backgroundColor=configuration.backgroundColor}}/>
                        </div>
                    </div>
                    <div className="champions-config">
                        <h2>Champions</h2>
                        <div className="config-row">
                            <button onClick={updateChampionsLibrary}>Charger la liste des champions</button>
                        </div>
                        <div className="config-row bg-white">
                            <DatalistInput
                            value={value}
                            setValue={setValue}
                            placeholder="Urgot"
                            label="Ajouter un champion"
                            onSelect={(item) => {
                                addChampion(item.value);
                                setValue('');
                            }}
                            items={championsLibrary}
                        />
                        </div>

                    </div>
                    <div className="players-config">
                        <h2>Joueurs</h2>
                        <button onClick={reloadRanking}>Actualiser le classement</button>
                        <hr/>
                        <button onClick={()=>{addPlayer('Player00#')}}>Ajouter joueur</button>
                        <hr/>
                        {players.map((player:object,index:number)=>{
                            return <PlayerConfigRow isFocus={focusedPlayer === index ? true : false} key={index} index={index} fct={fct} player={player}></PlayerConfigRow>
                        })
                        }

                    </div>
                </div>

            </div>
        </div>
    );
}

export default Tournament;