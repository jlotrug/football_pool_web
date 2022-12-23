import './App.css';


export const NewPoolForm = ({formClass}) => {


    return(
        <div>
            <NameForm formClass={formClass}/>
            {/* <GameForm /> */}
        </div>
    )
}

const GameForm = () => {

    return(
        <form>
            <span className='pool-input'>
               <input type="text"></input> 
            </span>

            <span className='pool-input'>
                <input type="text"></input>
            </span>
            <span className='pool-input'>
                <input type="submit" value="Done"></input>
            </span>

        </form>
    )
}

const NameForm = ({formClass}) => {

    return(
        <form className={formClass}>
            <label>Name</label><br />
            <span className='pool-input'>
                <input type="text" placeholder='eg... Week 14'></input>
            </span>
            <span className='pool-input'>
                <input type="submit" value="Done"></input>
            </span>
        </form>
    )
}

