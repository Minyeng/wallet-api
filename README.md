<h1>API Wallet</h1>
<p>A fast, lightweight, and secure API wallet services built using <strong>Express.js</strong>, <strong>PostgreSQL</strong>, and <strong>JWT authentication</strong>
</p>
<h2>⚙️ Tech Stack</h2>
<ul>
  <li>
    <strong>Express.js</strong> (Objection, Knex, Joi, JWT)
  </li>
  <li>
    <strong>PostgreSQL</strong> (Database)
  </li>
</ul>
<h2>📦 Getting Started</h2>
<h3>Install dependencies</h3>
<pre>
  npm install
</pre>
<h3>Set up environment variables</h3>
<p>
  Create a <code>.env</code> file based on <code>.env.example</code>:
</p>
<pre>
  PORT=5000
  DB_HOST=
  DB_PORT=
  DB_USER=
  DB_PASSWORD=
  DB_NAME=
  JWT_SECRET=
</pre>
<h3>Run migrations</h3>
<pre>
  npx knex migrate:latest
</pre>
<h3>Start the development server</h3>
<pre>
  npm run dev
</pre>


<h2>🌐 API Endpoints</h2>
<ol>
<li><pre>
GET /api/users/me
content-type: application/json
authorization: Bearer xxxxxxxxxxxxxxxxxxxxxxxx
</pre></li>
<li><pre>
POST /api/users/register
content-type: application/json

{
    "username": "superadmin",
    "password": "Pas$w0rd"
}
</pre></li>
<li><pre>
POST /api/users/login
content-type: application/json

{
    "username": "superadmin",
    "password": "Pas$w0rd"
}
</pre></li>
<li><pre>
GET /api/wallet/
content-type: application/json
authorization: Bearer xxxxxxxxxxxxxxxxxxxxxxxx
</pre></li>
<li><pre>
PUT /api/wallet/topup
content-type: application/json
authorization: Bearer xxxxxxxxxxxxxxxxxxxxxxxx

{
    "amount": 1000000000000
}
</pre></li>
<li><pre>
PUT /api/wallet/deduct
content-type: application/json
authorization: Bearer xxxxxxxxxxxxxxxxxxxxxxxx

{
    "amount": 1000000000000
}
</pre></li>
</ol>
