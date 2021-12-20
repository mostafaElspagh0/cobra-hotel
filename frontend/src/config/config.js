const dev = {
    api_url: 'http://localhost:4000'
};

const prod = {
    api_url: "https://cobra-backend.herokuapp.com",
};

const config = process.env.REACT_APP_STAGE === 'production'
    ? prod
    : dev;
export default {
    MAX_ATTACHMENT_SIZE: 5000000,
    ...config
};