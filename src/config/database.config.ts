
export const DATABASE_CONFIG = () => {
    return {
        type: 'postgres',
        host: 'localhost',
        port: 5432,
        username: 'your_username',
        password: 'your_password',
        database: 'your_database',
        databaseUrl: process.env.DATABASE_URL
    };
}