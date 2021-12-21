let dev = {
    api_url: 'http://localhost:4000'
};

let prod = {
    api_url: "https://cobra-backend.herokuapp.com",
};

export default (process.env.REACT_APP_STAGE === 'production')
    ? prod
    : dev;