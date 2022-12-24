import React from 'react'
import './MakePicksFormStyle.css'

// If I keep using these classes, create file with them and import where needed.
class Pool{
    constructor(name, poolId){
        this.name = name;
        this.poolId = poolId;
    }

    getName(){
        return this.name;
    }

    getId(){
        return this.poolId
    }
}

class Game{
    constructor(id, poolId, teamOne="", teamTwo=""){
        this.teamOne = teamOne;
        this.teamTwo = teamTwo;
        this.id = id;
        this.poolId = poolId
    }

    setTeamOne(name){
        this.teamOne = name;
    }

    setTeamTwo(name){
        this.teamTwo = name
    }

    getGameId(){
        return this.id;
    }
}

// Mock Data
const createMockPools = () => {
    const weekOne = new Pool("Week 1", 1)
    const weekTwo = new Pool("Week 2", 2)

    return [weekOne, weekTwo]
}

const createMockGames = () => {
    const w1g1 = new Game(1, 1, "Tennessee", "Green Bay")
    const w1g2 = new Game(2, 1, "Chicago", "Atlanta")
    const w1g3 = new Game(3, 1, "Cleveland", "Buffalo")
    const w1g4 = new Game(4, 1, "Philadelphia", "Indianapolis")
    const w1g5 = new Game(5, 1, "NY Jets", "New England")
    const w1g6 = new Game(6, 1, "LA Rams", "New Orleans")
    const w1g7 = new Game(7, 1, "Detroit", "NY Giants")
    const w1g8 = new Game(8, 1, "Carolina", "Baltimore")
    const w1g9 = new Game(9, 1, "Washington", "Houston")
    const w1g10 = new Game(10, 1, "Las Vegas", "Denver")
    const w1g11 = new Game(11, 1, "Dallas", "Minnesota")
    const w1g12 = new Game(12, 1, "Cincinnati", "Pittsburgh")
    const w1g13 = new Game(13, 1, "Kansas City", "LA Chargers")
    const w1g14 = new Game(14, 1, "San Francisco", "Arizona")

    const w2g1 = new Game(15, 2, "Las Vegas", "LA Rams")
    const w2g2 = new Game(16, 2, "NY Jets", "Buffalo")
    const w2g3 = new Game(17, 2, "Cleveland", "Cincinnati")
    const w2g4 = new Game(18, 2, "Houston", "Dallas")
    const w2g5 = new Game(19, 2, "Minnesota", "Detroit")
    const w2g6 = new Game(20, 2, "Jacksonville", "Tennessee")
    const w2g7 = new Game(21, 2, "Philadelphia", "NY Giants")
    const w2g8 = new Game(22, 2, "Carolina", "Baltimore")
    const w2g9 = new Game(23, 2, "Baltimore", "Pittsburgh")
    const w2g10 = new Game(24, 2, "Kansas City", "Denver")
    const w2g11 = new Game(25, 2, "Tampa Bay", "San Francisco")
    const w2g12 = new Game(26, 2, "Carolina", "Seattle")
    const w2g13 = new Game(27, 2, "Miami", "LA Chargers")
    const w2g14 = new Game(28, 2, "New England", "Arizona")
}


export const MakePicksForm = ({formClass}) => {
    const [weeks, setWeeks] = React.useState([])
    const [games, setGames] = React.useState([])
    const [allPoolsClass, setAllPoolsClass] = React.useState("all-pools")
    const [picksForm, setPicksForm] = React.useState("hide-element")

    React.useEffect(() => {
        setWeeks(createMockPools)
    },[])

    // Reset Make Picks Form when heading is clicked
    React.useEffect(() => {
        setAllPoolsClass("all-pools")
        setPicksForm("hide-element")
    }, [formClass])

    const poolSelected = () => {
        setAllPoolsClass("hide-element")
        setPicksForm("picks-form-div")
    }

    const handlePoolSelect = () => {
        poolSelected()
    }

    // console.log(classForm)
    return(
        <div className={formClass}>
            
            <div className={allPoolsClass}>
                <h2 className='pools-heading'>Pick a Pool</h2>
                    <ul className='no-bullet'>
                        {weeks.map(week =>(
                            <li key={week.getId()}>
                                <button 
                                className='pool-button'
                                onClick={handlePoolSelect}
                                >
                                    {week.getName()}
                                </button>
                            </li>
                        ))}
                    </ul>
            </div>

            <div className={picksForm}>

            </div>

        </div>
    )

}