import React from 'react';
import UserProfile from '../Chat/RightChat/UserProfile';

class Option extends React.Component {
    constructor(props) {
        super(props)
        this.state = { selected: false }
        this.handleChange = this.handleChange.bind(this)
    }

    handleChange() {
        this.setState(
            prevState => ({ selected: !prevState.selected }),
            () => this.props.onOptionChange(this.props.id, this.state.selected)
        )
    }

    render() {
        return (
            <div>
                <input
                    type="checkbox"
                    id={this.props.id}
                    name="option name"
                    value={this.props.option}
                    onChange={this.handleChange}
                    checked={this.state.selected}
                />
                <label htmlFor={this.props.id}>{this.props.option}</label>
            </div>
        )
    }
}
export default Option;