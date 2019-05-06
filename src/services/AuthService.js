const loginBody = (email, password) => {
    return {
        query: `
            query {
                login(email: "${email}", password: "${password}") {
                    userId
                    token
                    tokenExpiration
                }
            }  
        `
    };
};

const registerBody = (email, password, firstName, lastName) => {
    return {
        query: `
            mutation {
                createUser(userInput: {email: "${email}",
                                        password: "${password}", 
                                        firstName: "${firstName}", 
                                        lastName: "${lastName}"}) 
                {
                    _id
                    firstName
                    email
                }
            }
        `
    };
};

export class AuthService {

    login = ({ email, password }) => (
        this.request('login', loginBody(email, password))
    )

    register = ({ email, password, firstName, lastName }) => (
        this.request('register', registerBody(email, password, firstName, lastName))
    )

    request = (func, body) => {
        const headers = {
            'Content-Type': 'application/json'
        };

        return  fetch('http://localhost:3000/graphql-api', {
                    method: 'POST',
                    body: JSON.stringify(body),
                    headers
                })
                .then(res => {
                    if (res.status !== 200 && res.status !== 201) {
                        throw new Error(`${func} request failed!`);
                    }
                    
                    return res.json();
                })
                .catch(err => console.error('AuthService request error', err));
    }
}