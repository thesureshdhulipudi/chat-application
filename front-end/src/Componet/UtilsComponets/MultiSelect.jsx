import React from 'react';
import UserOption from './UserOption';

class MultiSelect extends React.Component {
    constructor(props) {
        super(props)
        this.state = { selectedOptions: [] }
        this.onOptionsChange = this.onOptionsChange.bind(this)
    }

    onOptionsChange(option, selected) {
        if (selected) {
            this.setState(
                prevState => {
                    prevState.selectedOptions.push(option)
                    return {
                        selectedOptions: prevState.selectedOptions,
                    }
                },
                () => this.props.onOptionsChange(this.state.selectedOptions)
            )
        } else {
            this.setState(
                prevState => {
                    const index = prevState.selectedOptions.indexOf(option)
                    if (index > -1) {
                        prevState.selectedOptions.splice(index, 1)
                    }
                    return {
                        selectedOptions: prevState.selectedOptions,
                    }
                },
                () => this.props.onOptionsChange(this.state.selectedOptions)
            )
        }
    }

    render() {
        return (
            <fieldset>
                <legend>{this.props.title}</legend>
                {this.props.options.map((option, index) => (
                    <UserOption
                        user={option}
                        key={option.id}
                        id={option.id}
                        option={option.firstName}
                        onOptionChange={this.onOptionsChange}
                        
                    />
                    // <Option key={option.id} id={option.id} option={option.firstName} onOptionChange={this.onOptionsChange} />
                ))}
            </fieldset>
        )
    }
}

export default MultiSelect;