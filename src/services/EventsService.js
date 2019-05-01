const requestBody = {
    query: `
        query {
            events {
                _id
                title
                description
                price
                date
                creator {
                    _id
                    firstName
                    lastName
                    email
                }
            }
        }  
    `
};

const mutationBody = ({ title, description, date, price }) => {
    return {
        query: `
            mutation {
                createEvent(eventInput: {title: "${title}", description: "${description}", date: "${date}", price: ${price}}) {
                    _id
                    title
                    description
                    price
                    date
                    creator {
                        _id
                        firstName
                        lastName
                        email
                    }
                }
            }  
        `
    };
};

export class EventsService {

    constructor(token) {
        this.token = token;
    }

    getEvents = () => (
        this.request('getEvents', requestBody)
            .then(res => res.data.events)
    )

    createEvent = ({ title, description, date, price }) => (
        this.request('createEvent', mutationBody({ title, description, date, price }), this.token)
            .then(res => res.data.createEvent)
    )

    request = (func, body, token) => {
        const headers = {
            'Content-Type': 'application/json'
        };

        if (token) {
            headers['Authorization'] = `Bearer ${token}`;
        }

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
                .then(res => {
                    if (res.errors && res.errors.length) {
                        throw new Error(`${func} request failed!`);
                    }
                    
                    return res;
                })
                .catch(err => console.error('EventsService request error', err));
    }
}