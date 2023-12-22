import express from 'express';
import pg from 'pg';
import basicAuth from 'express-basic-auth';
import 'dotenv/config'
const app = express();

const connectionString= process.env.DATABASE_URL;

const db = new pg.Pool({
    connectionString
})
let id = 0;
app.use(express.static('public')) 

//lets you get req.body from forms and parse URL-encoded data
app.use(express.urlencoded({ extended:true}));
app.use(express.json());

app.post('/register', async (req, res)=>{
    try{
        let body = req.body;
        for(let val in body){
            if(body[val]===''){
                body[val] = null;
            }
        }
        const { f_name, l_name, username, email, password, gender } = body;
        console.log(f_name, l_name, username, email, password);
        await db.query("INSERT INTO users (f_name, l_name, username, email, password) VALUES ($1, $2, $3, $4,crypt($5, gen_salt('bf')));",
        [f_name, l_name, username, email, password])
        const { rows } = await db.query("SELECT id from users WHERE username = $1;", [username]);
        let user_id= rows[0].id
        if(gender === 'male'){
            await db.query("INSERT INTO info (user_id, gender, interest) VALUES ($1,'M', 'F');", [user_id]);
        } else {
            await db.query("INSERT INTO info (user_id, gender, interest) VALUES ($1,'F', 'M');", [user_id]);
        }
        res.redirect('/');
    } catch (err){
        console.error(err)
        res.status(500).send("Internal Server Error");
    }
    
})

app.post('/login', async (req, res) => {
    try{
        const {username, password} = req.body;
        const {rows} = await db.query("SELECT id FROM users WHERE username = $1 and password = crypt($2, password);", [username, password])
    if (rows.length ===0){
        throw new Error;
    }
    id = rows[0].id;
    res.send("got it");
    } catch(err){
        console.log("bad login")
        res.status(401).send("Incorrect Username and Password!")
    }
})

app.get("/user", async (req, res) => {
    const {rows} = await db.query( 'SELECT users.f_name, users.l_name, info.personality, info.bio, info.gender, info.interest, info.pic FROM users JOIN info ON users.id = $1 AND users.id = info.user_id;', [id])
    res.send(rows);
})

app.listen(3000, ()=>{
    console.log('Listening on port 3000!')
})