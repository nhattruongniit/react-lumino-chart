const host = window.location.protocol + '//' + window.location.hostname + (window.location.port ? ':' + window.location.port : '');
const { REACT_APP_CLIENT_ID, REACT_APP_AUTHORITY } = process.env;

const config = {
  authority: REACT_APP_AUTHORITY,
  client_id: REACT_APP_CLIENT_ID,
  redirect_uri: `${host}/auth/callback`,
  response_type: 'id_token token',
  scope: 'openid profile bem',
  silent_redirect_uri: `${host}/silent`,
  automaticSilentRenew: true,
  post_logout_redirect_uri: `${host}/auth/logout`,
};

// mock oidc
// const config = {
//   authority: '',
//   client_id: '',
//   redirect_uri: '',
//   response_type: '',
//   scope: '',
//   silent_redirect_uri: '',
//   automaticSilentRenew: '',
//   post_logout_redirect_uri: '',
// };

console.log('OIDC config', config);

export default config;
