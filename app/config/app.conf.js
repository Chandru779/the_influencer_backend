module.exports = {
    appName: 'My Application',
    port: process.env.PORT || 3000,
    environment: process.env.NODE_ENV || 'development',
    apiBaseUrl: '/api',
    logging: {
        level: 'info',
        format: 'combined',
    },
    session: {
        secret: process.env.SESSION_SECRET || 'your-session-secret',
        resave: false,
        saveUninitialized: true,
    },
    cors: {
        origin: '*',
        methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
        preflightContinue: false,
    },
    database: {
        mongo: {
            uri: process.env.MONGO_URI || 'mongodb://localhost:27017/myapp',
            options: {
                useNewUrlParser: true,
                useUnifiedTopology: true,
            },
        },
    },
};