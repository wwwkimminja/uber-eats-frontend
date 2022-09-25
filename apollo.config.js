module.exports = {
    client: {
        includes: ['./src/**/*.tsx'],
        tagName: "gql",
        service: {
            name: "uber-eats-backend",
            url: "http://localhost:3000/graphql",
        },
    },
};