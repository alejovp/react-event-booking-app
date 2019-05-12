import { configure, mount } from 'enzyme';
import React from 'react';
import Adapter from 'enzyme-adapter-react-16';
import ConfirmButton from '../ConfirmButton';
import { MuiThemeProvider } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import { MockMuiTheme } from '../../../../__mocks__/MockMuiTheme';


configure({ adapter: new Adapter() });

describe('<ConfirmButton />', () => {

    const wrapper = mount(
        <MuiThemeProvider theme={MockMuiTheme} >
            <ConfirmButton>
                Confirm
            </ConfirmButton>
        </MuiThemeProvider>
    );
    const renderedButton = wrapper.find(Button);

    describe('shape', () => {
        
        it('renders a material-ui Button element', () => {
            expect(renderedButton).toHaveLength(1);
        });
        
    });
});
