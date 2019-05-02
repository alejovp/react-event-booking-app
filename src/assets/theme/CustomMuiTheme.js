import { createMuiTheme } from '@material-ui/core/styles';
import green from '@material-ui/core/colors/green';


const CustomMuiTheme = {
    palette: {
        confirm: {
            main: green[400],
            secondary: green[500]
        }
    },
    typography: {
        useNextVariants: true,
    },
    overrides: {
        MuiButton: {
            root: {
                // textTransform: 'none',
                borderRadius: 25,
                minWidth: '104px',
            },
        },
        MuiCard: {
            root: {
                borderRadius: 0
            }
        }
    }
};

export default createMuiTheme(CustomMuiTheme);