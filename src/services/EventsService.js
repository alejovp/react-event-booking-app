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
                }
            }
        }  
    `
};

export class EventsService {

    getEvents = () => (
        fetch('http://localhost:3000/graphql-api', {
            method: 'POST',
            body: JSON.stringify(requestBody),
            headers: {
                'Content-Type': 'application/json'
            }
        })
        .then(res => {
            if (res.status !== 200 && res.status !== 201) {
                throw new Error('getEvents request failed!');
            }
            
            return res.json();
        })
        .then(res => res.data.events)
    )
}