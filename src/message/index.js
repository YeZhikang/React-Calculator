import React from "react";

function Message(props) {
    return (
        <div className={ `message ${ props.class }` }>
            <div className={ 'message__header' }>
                { props.title }
            </div>
            <div className={ 'message__body' }>
                { props.children }
            </div>
        </div>
    )
}


function ErrorMessage(props) {
    return (
        <Message
            class={ 'message__error' }
            title={ props.title }
        >
            { props.text }
        </Message>
    )
}

export { ErrorMessage, Message }
