import React, { Component } from 'react';

import Modal from '../../components/UI/Modal/Modal';
import Aux from '../Auxable';

const withErrorHandler = (WrappedComponent, axios) => {
    return class extends Component {
        
        state = {
            error:null
        }

        /**
         * Child componentlerimzie data çekerken componentDidMount da veri çekeriz.
         * Eğer veri çekerken bir hata oluştuğu zaman, bunu yakalamak istersek burada child componentler in 
         * componentDidMount metodu çalışmadan aşarıdaki interceptorları yerleştirmeliyiz. Bunu yapmak için 
         * ise render metodundan önce çağrılan componentWillMount kullanmalıyız.
         */

        componentWillMount(){

            //Response ve Request her zaman geriye değer döndürmelidir.
            this.reqInterceptor = axios.interceptors.request.use(req => {
                this.setState({error:null});
                return req;
            });

            //Birinci parametre response parametresi
            this.resInterceptor = axios.interceptors.response.use(res => res,error => {
                //Eğer bir error dönerse state'imizdeki error null olmayacaktır.
                this.setState({error:error});
            });
        }

        //Componentimizin ömrü bittiği zaman interceptor lerimizi devre dışı bırakıyoruz.
        componentWillUnmount(){
            console.log('Will Unmount',this.reqInterceptor,this.resInterceptor);
            axios.interceptors.request.eject(this.reqInterceptor);
            axios.interceptors.response.eject(this.resInterceptor);
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