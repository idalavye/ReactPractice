import React, { Component } from 'react';

import Modal from '../../components/UI/Modal/Modal';
import Aux from '../Auxable';

const withErrorHandler = (WrappedComponent, axios) => {
    return class extends Component {
        
        state = {
            error:null
        }

        componentDidMount(){

            //Response ve Request her zaman geriye değer döndürmelidir.
            axios.interceptors.request.use(req => {
                this.setState({error:null});
                return req;
            });

            //Birinci parametre response parametresi
            axios.interceptors.response.use(res => res,error => {
                //Eğer bir error dönerse state'imizdeki error null olmayacaktır.
                this.setState({error:error});
            });
        }

        errorConfirmedHandler = () =>{
            this.setState({error:null});
        }
        
        render() {
            return (
                <Aux>
                    <Modal 
                        show={this.state.error}
                        modalClose={this.errorConfirmedHandler}>
                        {this.state.error ? this.state.error.message : null}
                </Modal>    
                    <WrappedComponent {...this.props} />
                </Aux>
            );
        }
    }
}

export default withErrorHandler;