import express from 'express';
import pg from 'pg';
import basicAuth from 'express-basic-auth';
import 'dotenv/config'
const app = express();

const connectionString= process.env.DATABASE_URL;

const db = new pg.Pool({
    connectionString
})
let id = 1;
let global_interest = ''
let global_gender = ''
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
            await db.query("INSERT INTO info (user_id, gender, interest) VALUES ($1,'Men', 'Women');", [user_id]);
        } else {
            await db.query("INSERT INTO info (user_id, gender, interest) VALUES ($1,'Women', 'Men');", [user_id]);
        }
        await db.query('insert into matches(user1_id, user2_id) Select users.id, info.id from users join info on users.id!=info.user_id and users.id=$1 AND users.id IS NOT NULL;', [user_id]);
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
    global_interest = rows[0].interest;
    global_gender = rows[0].gender;
    //console.log(interested)
    res.send(rows);
})

app.patch("/user", async (req, res) => {
    try{
        const {personality, bio, interest}= req.body;
        console.log(req.body);
        await db.query( 'UPDATE info SET personality = $1, bio = $2, interest = $3 WHERE user_id = $4;',[personality, bio, interest, id])
        const {rows} = await db.query( 'SELECT users.f_name, users.l_name, info.personality, info.bio, info.gender, info.interest, info.pic FROM users JOIN info ON users.id = $1 AND users.id = info.user_id;', [id])
        res.send(rows);
    } catch(err){
        res.send("bad request");
    }
    
})

app.get("/profile", async (req, res)=>{
    try{
        const {rows} = await db.query( 'SELECT users.f_name, users.l_name, info.personality, info.bio, info.pic FROM users JOIN info ON users.id != $1 AND users.id = info.user_id AND info.interest = $2 AND info.gender = $3;', [id, global_gender, global_interest])
        res.send(rows);
    }catch(err){
        res.send('bad request')
    }
})

app.get("/matches", async (req, res) =>{
    try{
        const {rows} = await db.query("select user1_id, user2_id FROM matches WHERE match='t' AND (user1_id = $1 OR user2_id=$1);", [id]);
        console.log(rows);
        let matches = [];
        for(let i =0; i<rows.length; i++){
            if(rows[i].user1_id === id){
                let user2 = await db.query("SELECT f_name, l_name, pic FROM users JOIN info ON users.id = $1 AND users.id = user_id;", [rows[i].user2_id])
                matches.unshift(user2.rows[0]);
            } else{
                let user1 = await db.query("SELECT f_name, l_name, pic FROM users JOIN info ON users.id = $1 AND users.id = user_id;",[rows[i].user1_id])
                matches.unshift(user1.rows[0]);
            }
        }
        res.send(matches);
    } catch (err){
        console.log(err);
        res.send('bad request')
    }
})

app.listen(3000, ()=>{
    console.log('Listening on port 3000!')
})