# Neo Rewards Demo

This is a demo backend service inspired by Neo Financial's rewards platform. It uses Node.js, TypeScript, MongoDB, and GraphQL.

## Development

```bash
npm install
docker-compose up -d
npm run seed # populate the database schema & data
npm run dev
```

### Environment files

- `.env` - default development settings
- `.env.test` - used when running tests
- `.env.production` - example file for production deployments

The database connection string is selected automatically based on `NODE_ENV`.
