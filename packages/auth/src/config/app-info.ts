export function getApiDomain() {
    const apiPort = process.env.REACT_APP_API_PORT || 8080;
    const apiUrl = process.env.REACT_APP_API_URL || `http://localhost:${apiPort}`;
    return apiUrl;
}

export function getWebsiteDomain() {
    const websitePort = process.env.REACT_APP_WEBSITE_PORT || 3000;
    const websiteUrl = process.env.REACT_APP_WEBSITE_URL || `http://localhost:${websitePort}`;
    console.log("websiteUrl", websiteUrl);
    return websiteUrl;
}

export const appInfo = {
    appName: 'instapark',
    apiDomain: 'http://localhost:8080',
    websiteDomain: 'http://localhost:3000',
    apiBasePath: '/auth',
    websiteBasePath: '/auth',
};