import React from 'react';
import UserProfile from '../Chat/RightChat/UserProfile';

class UserOption extends React.Component {
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
                <div id={this.props.id}>
                <UserProfile
                    user={this.props.user}
                    index={this.props.id}
                    handleUser={this.handleChange}
                    chatUserProfile="chat-user-profile-group-create"
                    chatUserIcon="chat-user-icon-group-create"
                    checked={this.state.selected}
                />
                </div>
            </div>
        )
    }
}
export default UserOption;