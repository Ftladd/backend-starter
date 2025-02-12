import './config'; // Load environment variables
import 'express-async-errors'; // Enable default error handling for async errors
import express, { Express } from 'express';
import session from 'express-session';
import ip from 'ip';
import connectSqlite3 from 'connect-sqlite3';
import { registerUser, logIn } from './controllers/Usercontroller';
import { shortenUrl, getOriginalUrl } from './controllers/LinkController';

const app: Express = express();
const { PORT, COOKIE_SECRET } = process.env;

const SQLiteStore = connectSqlite3(session);

app.use(
  session({
    store: new SQLiteStore({ db: 'sessions.sqlite' }),
    secret: COOKIE_SECRET,
    cookie: { maxAge: 8 * 60 * 60 * 1000 },
    name: 'session',
    resave: false,
    saveUninitialized: false,
  })
);

app.use(express.json());

// app.get('/api/users/:userId/links', getLinks);
app.post('/api/links', shortenUrl);
// app.delete('/api/users/:userId/links/linkId', deleteLink);
app.get('/:linkId', getOriginalUrl);
app.post('/api/users', registerUser);
app.post('/api/login', logIn);

app.listen(PORT, () => {
  console.log(`App is listening on port http://${ip.address()}:${PORT}`);
});
