import { configure, mount } from 'enzyme';
import React from 'react';
import Adapter from 'enzyme-adapter-react-16';
import { Backdrop } from '../Backdrop';


configure({ adapter: new Adapter() });

describe('<Backdrop />', () => {
    const mockCallback = jest.fn();
    const renderedComponent = mount(<Backdrop onClose={mockCallback} />);
    const renderedDiv = renderedComponent.find('div');

    describe('shape', () => {
        
        it('renders a div element', () => {
            expect(renderedDiv).toHaveLength(1);
        });

        it('will have a class="backdrop"', () => {
            expect(renderedDiv.hasClass('backdrop')).toBe(true);
        });
        
    });

    describe('props', () => {
        
        it('will call onClose func when clicked', () => {
            renderedComponent.simulate('click');
            expect(mockCallback.mock.calls.length).toBe(1);
        });
        
    });
});
