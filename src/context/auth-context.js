import React from 'react';

export default React.createContext({
    userId: undefined,
    token: undefined,
    login: () => {},
    logout: () => {}
});