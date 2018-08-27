import React, { Component } from 'react';
import { connect } from 'react-redux'; //hoc

import CounterControl from '../../components/CounterControl/CounterControl';
import CounterOutput from '../../components/CounterOutput/CounterOutput';
import * as actionType from '../../store/actions';

class Counter extends Component {

    render() {
        return (
            <div>
                <CounterOutput value={this.props.ctr} />
                <CounterControl label="Increment" clicked={this.props.onIncrementCounter} />
                <CounterControl label="Decrement" clicked={this.props.onDecrementCounter} />
                <CounterControl label="Add 10" clicked={this.props.onAddCounter} />
                <CounterControl label="Subtract 8" clicked={this.props.onSubtractCounter} />
                <hr></hr>
                <button onClick={this.props.onStoreResult}>Store Result</button>
                <ul>
                    {this.props.storedResults.map(strResult => (
                        <li key={strResult.id} onClick={() => this.props.onDeleteResult(strResult.id)}>{strResult.value}</li>
                    ))}
                </ul>
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        //Bu continerdaki counter verisine erişmek için ctr'a yetki verdik.
        ctr: state.counter,
        storedResults: state.results
    };
};

const mapDispatchToProps = dispatch => {
    return {
        onIncrementCounter: () => dispatch({ type: actionType.INCREMENT }),
        onDecrementCounter: () => dispatch({ type: actionType.DECREMENT }),
        onAddCounter: () => dispatch({ type: actionType.ADD, val: 10 }),
        onSubtractCounter: () => dispatch({ type: actionType.SUBTRACT, val: 8 }),
        onStoreResult: () => dispatch({ type: actionType.STORE_RESULT }),
        onDeleteResult: (id) => dispatch({ type: actionType.DELETE_RESULT, resultElId: id })
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(Counter);