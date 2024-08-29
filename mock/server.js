import jsonServer from 'json-server';
import path from 'path';
import { fileURLToPath } from 'url';

import cookieParser from 'cookie-parser'

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const server = jsonServer.create();
const router = jsonServer.router(path.join(__dirname, 'db.json'));
const middlewares = jsonServer.defaults();

server.use(middlewares);
server.use(jsonServer.bodyParser);
server.use(cookieParser());

server.post('/login', (req, res) => {
  const { username, password } = req.body;
  const users = router.db.get('users').value();
  const user = users.find(u => u.username === username && u.password === password);

  if (user) {
    res.setHeader('Set-Cookie', 'token=abc123; HttpOnly');
    res.status(200).json({ message: 'Login bem-sucedido', user, status:200 });
  } else {
    res.status(401).json({ message: 'Credenciais inválidas' });
  }
});

server.use((req, res, next) => {
  if (req.path === '/login') {
    return next(); 
  }

  const token = req.cookies?.token;
  console.log(req);
  
  if (token === 'abc123') {  
    next();  
  } else {
    res.status(401).json({ message: 'Acesso negado. Token inválido ou ausente.' });
  }
});


server.use(router);

const port = process.env.PORT || 3333;
server.listen(port, () => {
  console.log(`JSON Server is running on port ${port}`);
});
