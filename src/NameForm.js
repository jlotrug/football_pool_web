import React from "react"
import axios from "axios"

export const NameForm = ({formClass, handleCallback}) => {
    const [formDisabled, setFormDisabled] = React.useState(false)
    const [submitValue, setSubmitValue] = React.useState('Done')

    const handleSubmit = (e) => {
        if(submitValue === 'Done'){
            handleCallback(e)
            setSubmitValue('Edit')
            setFormDisabled(true)
        }else{
            e.preventDefault()
            setSubmitValue('Done')
            setFormDisabled(false)
        }
        // changeAfterSubmit()
    }

    // const changeAfterSubmit = () => {
    //     formDisabled ? setFormDisabled(false) : setFormDisabled(true)
    //     submitValue === 'Done' ? setSubmitValue("Edit") : setFormDisabled("Done")
    // }

    return(
        <form onSubmit={handleSubmit} className={formClass}>
            <label>Name</label><br />
            <span className='pool-input'>
                <input disabled={formDisabled} type="text" placeholder='eg... Week 14'></input>
            </span>
            <span className='pool-input'>
                <input type="submit" value={submitValue}></input>
            </span>
        </form>
    )
}