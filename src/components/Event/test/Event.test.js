import React from 'react';
import { configure, mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import Card from '@material-ui/core/Card';
import Event from '../Event';
import { EventsMock } from '../../../../__mocks__/EventsMock';


configure({ adapter: new Adapter() });

describe('<Event />', () => {
    // const mockCallback = jest.fn();
    const renderedComponent = mount(<Event eventData={EventsMock[0]} />);

    describe('shape', () => {
        
        it('renders a material-ui Card element', () => {
            expect(renderedComponent.find(Card)).toHaveLength(1);
        });

        // it('will have a class="backdrop"', () => {
        //     expect(renderedDiv.hasClass('backdrop')).toBe(true);
        // });
        
    });

    describe('props', () => {
        
        // it('will return null if eventData is undefined', () => {
        //     const renderedComponent = mount(<Event />);
        //     console.log(renderedComponent.children().debug())
		// 	expect(renderedComponent.children().type()).toEqual(null);
        // });
        
        // it('will call onClose func when clicked', () => {
        //     renderedComponent.simulate('click');
        //     expect(mockCallback.mock.calls.length).toBe(1);
        // });
        
    });
});
