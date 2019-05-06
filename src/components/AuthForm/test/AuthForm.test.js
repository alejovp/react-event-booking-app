import { configure, mount } from 'enzyme';
import React from 'react';
import Adapter from 'enzyme-adapter-react-16';
import Button from '@material-ui/core/Button';
import AuthForm from '../AuthForm';


configure({ adapter: new Adapter() });

describe('<AuthForm />', () => {

    const defaultState = {
        firstName: undefined,
        lastName: undefined,
        email: undefined,
        password: undefined,
        formErrors: {
            firstNameError: undefined,
            lastNameError: undefined,
            emailError: undefined,
            passwordError: undefined
        }
    };
    const renderedComponent = mount(<AuthForm />);

    describe('shape', () => {
        
        it('renders a form element', () => {
            expect(renderedComponent.find('form')).toHaveLength(1);
        });

        it('renders a submit Button', () => {
            const button = renderedComponent.find(Button);
            expect(button).toHaveLength(1);
            expect(button.prop('type')).toEqual('submit');
        });
        
        it('renders a required email input field', () => {
            const emailInput = renderedComponent.find('[name="email"]').filter('input');
            expect(emailInput).toHaveLength(1);
            expect(emailInput.prop('required')).toEqual(true);
        });
        
        it('renders a required password input field', () => {
            const passwordInput = renderedComponent.find('[name="password"]').filter('input');
            expect(passwordInput).toHaveLength(1);
            expect(passwordInput.prop('required')).toEqual(true);
        });
        
    });

    describe('props', () => {
        it('will show an error message if email value is not correct', () => {
            const emailInput = renderedComponent.find('[name="email"]').filter('input');
            emailInput.simulate('change', { target: { name: 'email', value: 'alejovptest.com' } });
            renderedComponent.simulate('submit');
            // console.log(renderedComponent.children().state().email)
            // console.log(renderedComponent.children().state().formErrors)
            renderedComponent.update();
            const errorMessage = renderedComponent.findWhere(n => n.type() === 'p' && n.text() === 'Please enter a valid email address.');
            expect(errorMessage).toHaveLength(1);
        });
    });

});
