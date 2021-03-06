//connect wrapper olmadan saf bir şekilde burger builder componentini dahil etmek istersek bu şekilde dahil edebiliriz
import { BurgerBuilder } from './BurgerBuilder';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';

import React from 'react';

import { configure, shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

configure({ adapter: new Adapter() });

describe('<BurgerBuilder />', () => {
    let wrapper;

    beforeEach(() => {
        wrapper = shallow(<BurgerBuilder onInitIngredients={() => {}}/>);
    });

    it('should render <BuildConrols /> when receiving ingredients', () => {
        wrapper.setProps({ ings: { salad: 0 } });
        expect(wrapper.find(BuildControls)).toHaveLength(1);
    });
});