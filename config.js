const env = process.env;

const config = {
    db: {
        host: env.DB_HOST || 'ruby.db.elephantsql.com',
        port: env.DB_PORT || '5432',
        user: env.DB_USER || 'ukggwjdb',
        password: env.DB_PASSWORD || 'ynLyFB9yx_3CyG-mJ7iwDIJGzrrb8Kn6',
        database: env.DB_NAME || 'ukggwjdb'
    },
    listPerPage: env.LIST_PER_PAGE || 10,
};

module.exports = config;