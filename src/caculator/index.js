import React from "react";
import { ErrorMessage } from "../message";

const buttonArr = ['(', ')', '%', 'C', '7', '8', '9', '/', '4', '5', '6', '*', '1', '2', '3', '-', '0', '.', '=', '+']

export class Calculator extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            operationArr: [],
            isRender: false,
            result: 0,
            isError: {
                show: false,
                title: '',
                text: ''
            }
        }
    }

    handleAddOperation(value) {
        this.setState({
            isRender: false,
            operationArr: [...this.state.operationArr, value],
            result: 0,
            isError: {
                show: false,
                title: '',
                text: ''
            }
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
        try {
            const result = eval(this.state.operationArr.join(''))
            this.setState({
                isRender: true,
                operationArr: [result],
                result,
            })
        } catch (e) {
            this.setState({
                isRender: false,
                operationArr: [],
                isError: {
                    show: true,
                    title: '计算错误',
                    text: `含错误计算符号：" ${this.state.operationArr.join('')} " `
                }
            })

        }
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
        return (
            <div className={ 'calculator' }>
                {
                    this.state.isError.show ? <ErrorMessage
                        title={ this.state.isError.title }
                        text={ this.state.isError.text }
                    /> : null
                }
                <ShowScreen value={ showThing }/>
                <div className={ 'calculator__button-group' }>
                    {
                        buttonArr.map(item => {
                            let buttonHtml = ''
                            switch (item) {
                                case '=':
                                    buttonHtml = <CalculatorButton
                                        click={ this.isRender.bind(this) }
                                        value={ item }
                                    />
                                    break;
                                case 'C':
                                    buttonHtml = <CalculatorButton
                                        click={ this.clearAll.bind(this) }
                                        value={ item }
                                    />
                                    break;
                                default:
                                    buttonHtml = <CalculatorButton
                                        click={ this.handleAddOperation.bind(this) }
                                        value={ item }
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
        <div className={ 'calculator__screen' }>
            { props.value }
        </div>
    )
}

function CalculatorButton(props) {
    function handleClick() {
        props.click(props.value)
    }

    return (
        <div
            className={ 'calculator__button-group__button' }
            onClick={ handleClick }
        >
            { props.value }
        </div>
    )
}
