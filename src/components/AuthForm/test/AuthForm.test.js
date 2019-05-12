import { configure, mount } from 'enzyme';
import React from 'react';
import Adapter from 'enzyme-adapter-react-16';
import Button from '@material-ui/core/Button';
import AuthForm from '../AuthForm';


configure({ adapter: new Adapter() });

describe('<AuthForm />', () => {
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
        const registerForm = mount(<AuthForm formType='register' />);
        const firstnameInput = registerForm.find('[name="firstName"]').filter('input');
        const lastnameInput = registerForm.find('[name="lastName"]').filter('input');
        
        it('will show an error message if email value is not supplied', () => {
            renderedComponent.simulate('submit');
            renderedComponent.update();
            const errorMessage = renderedComponent.findWhere(n => n.type() === 'p' && n.text() === 'Please enter your email address.');
            expect(errorMessage).toHaveLength(1);
        });

        it('will show an error message if email value is not correct', () => {
            const emailInput = renderedComponent.find('[name="email"]').filter('input');
            emailInput.simulate('change', { target: { name: 'email', value: 'alejovptest.com' } });
            renderedComponent.simulate('submit');
            renderedComponent.update();
            const errorMessage = renderedComponent.findWhere(n => n.type() === 'p' && n.text() === 'Please enter a valid email address.');
            expect(errorMessage).toHaveLength(1);
        });

        it('will show an error message if password value is not supplied', () => {
            renderedComponent.simulate('submit');
            renderedComponent.update();
            const errorMessage = renderedComponent.findWhere(n => n.type() === 'p' && n.text() === 'Please enter your password.');
            expect(errorMessage).toHaveLength(1);
        });

        it('will render a firstname input elem if formType prop === register', () => {
            expect(firstnameInput).toHaveLength(1);
        });

        it('will render a lastname input elem if formType prop === register', () => {
            expect(lastnameInput).toHaveLength(1);
        });

        it('will show an error message if firstname or lastname values are not correct', () => {
            firstnameInput.simulate('change', { target: { name: 'firstName', value: 'alejo-' } });
            lastnameInput.simulate('change', { target: { name: 'lastName', value: 'vazque-' } });
            registerForm.simulate('submit');
            registerForm.update();
            const errorMessage = registerForm.findWhere(n => n.type() === 'p' && n.text() === 'Please enter alphabet characters only.');
            expect(errorMessage).toHaveLength(2);
        });
    });

});
