import React from 'react'

function details(props) {
    return (
        <div>
        
            <h3>Please Enter your name to get started</h3>
            <form >
                <input type='text' placeholder='Enter your name' value={props.name} onChange={props.handleChange} />
                <input type='submit' value='Submit' onClick = {props.nameSubmit} />
            </form>
                    
        </div>
    )
}

export default details
