import jsonServer from 'json-server';
import path from 'path';
import { fileURLToPath } from 'url';

import cookieParser from 'cookie-parser'


const tokenToUser = (req) => {
  const token = req.cookies?.token;
  const users = router.db.get('users').value();
  return users.find(u => u.token === token);
  
}

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
    res.setHeader('Set-Cookie', `token=${user.token}; HttpOnly`);
    res.status(200).json({ message: 'Login bem-sucedido', user, status:200 });
  } else {
    res.status(401).json({ message: 'Credenciais inválidas' });
  }
});


server.get('/posts', (req, res) => {
  const user = tokenToUser(req);

  const postsDb = router.db.get('posts').value();
  
  const userPosts = postsDb.filter(p => p.userId === user.id);
  
  const sortedPosts = userPosts.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
  
  const page = parseInt(req.query._page) || 1;
  const limit = parseInt(req.query._limit) || 4;
  const startIndex = (page - 1) * limit;
  const endIndex = page * limit;
  
  const paginatedPosts = sortedPosts.slice(startIndex, endIndex);
  
  res.status(200).json(paginatedPosts);
});


server.use((req, res, next) => {
  if (req.path === '/login') {
    return next(); 
  }

  const user = tokenToUser(req)
  
  if (user) {  
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
