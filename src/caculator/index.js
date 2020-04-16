import React from "react";

const buttonArr = ['(', ')', '%', 'C', '7', '8', '9', '/', '4', '5', '6', '*', '1', '2', '3', '-', '0', '.', '=', '+']

export class Calculator extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            operationArr: [],
            isRender: false,
            result: 0
        }
    }

    handleAddOperation(value) {
        this.setState({
            isRender: false,
            operationArr: [...this.state.operationArr, value],
            result: 0,
        })
    }

    handleDeleteOperation() {
        this.setState({
            isRender: false,
            operationArr: this.state.operationArr.slice(0, -1),
            result: 0
        })
    }

    isRender() {
        const result = eval(this.state.operationArr.join(''))
        this.setState({
            isRender: true,
            operationArr: [],
            result
        })
    }

    clearAll() {
        this.setState({
            isRender: false,
            operationArr: [],
            result: 0
        })
    }

    render() {
        const showThing = this.state.isRender ? this.state.result : this.state.operationArr.join('')
        console.log(this.state.operationArr)
        return (
            <div className={'calculator'}>
                <ShowScreen value={showThing}/>
                <div className={'calculator__button-group'}>
                    {
                        buttonArr.map(item => {
                            let buttonHtml = ''
                            switch (item) {
                                case '=':
                                    buttonHtml = <CalculatorButton
                                        click={this.isRender.bind(this)}
                                        value={item}
                                    />
                                    break;
                                case 'C':
                                    buttonHtml = <CalculatorButton
                                        click={this.clearAll.bind(this)}
                                        value={item}
                                    />
                                    break;
                                default:
                                    buttonHtml = <CalculatorButton
                                        click={this.handleAddOperation.bind(this)}
                                        value={item}
                                    />
                            }
                            return buttonHtml
                        })
                    }
                </div>
            </div>
        );
    }
}

function ShowScreen(props) {
    return (
        <div className={'calculator__screen'}>
            {props.value}
        </div>
    )
}

function CalculatorButton(props) {
    function handleClick() {
        props.click(props.value)
    }

    return (
        <div className={'calculator__button-group__button'} onClick={handleClick}>
            {props.value}
        </div>
    )
}
