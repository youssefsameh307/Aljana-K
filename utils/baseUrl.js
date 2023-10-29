const baseUrl = process.env.NODE_ENV === "production"
    ? 'https://aljana-medicalcenter.com/'
    : 'http://localhost:3000';

export default baseUrl;