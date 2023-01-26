export default () => ({
  port: parseInt(process.env.PORT, 10) || 3000,
  keycloak: {
    host: process.env.KEYCLOAK_URL,
    realm: process.env.KEYCLOAK_REALM,
    client: process.env.KEYCLOAK_CLIENT_ID,
    secret: process.env.KEYCLOAK_CLIENT_SECRET,
  },
  database: {
    host: process.env.DB_HOST,
    port: parseInt(process.env.DB_PORT, 10) || 5432,
  },
});
