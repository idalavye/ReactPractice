import React,{Component} from 'react';
import Person from './Person/Person';

/*
const persons = () => {
    return ();
}
*/
//Arrow functionlarda return işlemi parantez açarak daha pratik bir şekilde gerçekleştirebiliriz.
//const persons = () => ();
/*
const persons = (props) => props.persons.map((person, index) => {
    return <Person
        name={person.name}
        age={person.age}
        click={() => props.click(index)}
        key={person.id}
        changed={(event) => props.changed(event, person.id)}
        />     
}); 

export default persons;
*/


//So now we turned our stateless component into a stateful component.
class Persons extends Component{
    
    constructor(props){
        super(props);
        console.log('[Persons.js] Inside Constructors');
    }
    
    componentWillMount(){
        console.log('[Persons.js] Inside componentWillMounth');
    }
    
    componentDidMount(){
        console.log('[Persons.js] Inside componentDidMounth');
    }

    componentWillReceiveProps(nextProps){
        console.log('[Update Persons.js] Inside componentWillReceiveProps',nextProps);
    }
    
    shouldComponentUpdate(nextProps,nextState){
        console.log('[Update Persons.js] Inside shouldComponentUpdate');
        //Bu metot geriye true veya false bir değer döndürmelidir. True değer döndürürse update işlemi devam edecektir.
        //false değer döndürürse updated işllemi yarıda kesilecektir.
        
        return nextProps.persons !== this.props.person ||
            nextProps.changed !== this.props.changed ||
            nextProps.click !== this.props.click;

        /**
         * Eğer return true yaparsak herhangi bir değişiklik olsun yada olmasın render metotları tetiklenir. Ama
         * yukarıdaki şekilde bir kısıtlama yaparsak sadece bir değişiklik gerçekleştiği zaman render metotları 
         * tetiklenecektir.
         */
        //return true;
    }


    componentWillUpdate(nextProps,nextState){
        console.log('[Update Persons.js] Insided componentWillUpdate',nextProps,nextState);
    }

    componentDidUpdate(){
        //Bu noktada nextProps and nextStates currentProps and currentStates e dönüşür.
        console.log('[Update Persons.js] Insided componentDidUpdate');
    }

    render(){
        console.log(['[Persons.js] Inside render'])
        return this.props.persons.map((person, index) => {
            return <Person
                name={person.name}
                age={person.age}
                click={() => this.props.click(index)}
                key={person.id}
                changed={(event) => this.props.changed(event, person.id)}
                />     
        })
    }
}

export default Persons