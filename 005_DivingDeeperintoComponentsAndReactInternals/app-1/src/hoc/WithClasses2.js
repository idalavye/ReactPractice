import React, { Component } from 'react';
/*
const WithClasses = (WrappedComponent, className) => {
    return (props) => (
        <div className = {className}>
            <WrappedComponent {...props}/>
        </div>
    )
}
*/

const WithClasses = (WrappedComponent, className) => {
    /*
    return class extends Component {
        render(){
            return(
                <div className = {className}>
                    <WrappedComponent ref={this.props.forwardedRef} {...this.props}/>
                </div>
            )
        }
    }
    */

    const WithClass = class extends Component {
        render() {
            return (
                <div className={className}>
                    <WrappedComponent ref={this.props.forwardedRef} {...this.props} />
                </div>
            )
        }
    }

    return React.forwardRef((props,ref)=>{
        return <WithClass {...props} forwardedRef={ref} />
    });
}
export default WithClasses;

//Not: Eğer class bazlı component oluşturursak this anahtar kelimesini kullanmalıyız.