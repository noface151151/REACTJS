import React, {
    Component
} from 'react';
import {
    Redirect
} from 'react-router-dom';
import * as actions from '../../../store/actions/index';
import {
    connect
} from 'react-redux';
class Logout extends Component {

    componentDidMount() {
        this.props.logOut();
    }
    render() {
        return (
             <Redirect to = "/" />
        )
    }
}

const mapDispatchToProps = dispatch => {
    return {
        logOut: () => dispatch(actions.logout())
    }

}


export default connect(null, mapDispatchToProps)(Logout);