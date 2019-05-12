import { createMuiTheme } from '@material-ui/core/styles';
import green from '@material-ui/core/colors/green';


export const MockMuiTheme = createMuiTheme({
    palette: {
        confirm: {
            main: green[400],
            secondary: green[500]
        }
    },
});