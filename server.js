import express from 'express';
import pg from 'pg';
import basicAuth from 'express-basic-auth';
import 'dotenv/config'
import multer from 'multer';
const app = express();
let imagefullname = ''

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, 'public/profile_pics/')
    },
    filename: function (req, file, cb) {
      const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
      imagefullname= file.fieldname + '-' + uniqueSuffix+ ".jpg"
      cb(null, imagefullname)
    }
  })
  
  const upload = multer({ storage: storage })
const connectionString= process.env.DATABASE_URL;

const db = new pg.Pool({
    connectionString
})

let global_interest = ''
let global_gender = ''
app.use(express.static('public')) 

//lets you get req.body from forms and parse URL-encoded data
app.use(express.urlencoded({ extended:true}));
app.use(express.json());

app.post('/register', upload.single('image'), async (req, res)=>{
    try{
        let body = req.body;
        for(let val in body){
            if(body[val]===''){
                body[val] = null;
            }
        }
        const { f_name, l_name, username, email, password, gender } = body;
        await db.query("INSERT INTO users (f_name, l_name, username, email, password) VALUES ($1, $2, $3, $4,crypt($5, gen_salt('bf')));",
        [f_name, l_name, username, email, password])
        const { rows } = await db.query("SELECT id from users WHERE username = $1;", [username]);
        let user_id= rows[0].id
        let path = `profile_pics/${imagefullname}`
        if(gender === 'male'){
            await db.query("INSERT INTO info (user_id, gender, interest, pic) VALUES ($1,'Men', 'Women', $2);", [user_id, path]);
        } else {
            await db.query("INSERT INTO info (user_id, gender, interest, pic) VALUES ($1,'Women', 'Men', $2);", [user_id, path]);
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

    res.send(rows[0]);
    } catch(err){
        console.log("bad login")
        console.log(err);
        res.status(401).send("Incorrect Username and Password!")
    }
})

app.get("/user/:id", async (req, res) => {
    const {id} = req.params;
    const {rows} = await db.query( 'SELECT users.f_name, users.l_name, info.personality, info.bio, info.gender, info.interest, info.pic FROM users JOIN info ON users.id = $1 AND users.id = info.user_id;', [id])
    global_interest = rows[0].interest;
    global_gender = rows[0].gender;
    res.send(rows);
})

app.patch("/user/:id", async (req, res) => {
    try{
        const {id} = req.params;
        const {personality, bio, interest}= req.body;
        await db.query( 'UPDATE info SET personality = $1, bio = $2, interest = $3 WHERE user_id = $4;',[personality, bio, interest, id])
        const {rows} = await db.query( 'SELECT users.f_name, users.l_name, info.personality, info.bio, info.gender, info.interest, info.pic FROM users JOIN info ON users.id = $1 AND users.id = info.user_id;', [id])
        res.send(rows);
    } catch(err){
        res.send("bad request");
    }
    
})

app.delete('/user/:id', async (req, res) => {
    try{
        const {id} = req.params;
        await db.query('DELETE FROM users WHERE id = $1;', [id]);
        res.send("user deleted")
    } catch (err){
        console.error(err);
    }
})

app.get("/profile/:id", async (req, res)=>{
    try{
        const {id} = req.params;
        const {rows} = await db.query( 'SELECT users.id, users.f_name, users.l_name, info.personality, info.bio, info.pic FROM users JOIN info ON users.id != $1 AND users.id = info.user_id AND info.interest = $2 AND info.gender = $3;', [id, global_gender, global_interest])
        let profiles = []
        
            for (let i = rows.length-1; i>=0; i--){
               
            let user = await db.query("SELECT user1_id,user2_id, user1_likes, user2_likes FROM matches WHERE (user1_id = $1 or user2_id = $1) AND (user1_id = $2 OR user2_id = $2);",[id, rows[i].id])
            
            if(user.rows[0].user1_id == id && user.rows[0].user1_likes != null){
                
                rows.splice(i, 1)
            } if(user.rows[0].user2_id == id && user.rows[0].user2_likes != null){
                
                rows.splice(i,1)
            }
            
            
            }
            
        res.send(rows);
    }catch(err){
        console.log(err)
        res.send('bad request')
    }
})

app.get("/matches/:id", async (req, res) =>{
    try{
        const {id} = req.params;
        const {rows} = await db.query("select id,user1_id, user2_id FROM matches WHERE match='t' AND (user1_id = $1 OR user2_id=$1);", [id]);
        let matches = [];
        for(let i =0; i<rows.length; i++){
            //et match_id = rows[i].id
            if(rows[i].user1_id == id){
                let user2 = await db.query("SELECT users.id, f_name, l_name, pic FROM users JOIN info ON users.id = $1 AND users.id = user_id;", [rows[i].user2_id])
                user2.rows[0].match_id = rows[i].id
                matches.unshift(user2.rows[0]);

            } else{
                let user1 = await db.query("SELECT users.id, f_name, l_name, pic FROM users JOIN info ON users.id = $1 AND users.id = user_id;",[rows[i].user1_id])
                user1.rows[0].match_id = rows[i].id
                matches.unshift(user1.rows[0]);
            }
        }
        res.send(matches);
    } catch (err){
        console.log(err);
        res.send('bad request')
    }
})

app.patch("/swipe-right/:id", async (req, res) => {
    try{
        const{id} = req.params;
        const {profile_id}= req.body;
        const {rows} = await db.query("select user1_id, user2_id, user1_likes, user2_likes FROM matches WHERE (user1_id = $1 OR user2_id=$1) AND (user1_id = $2 OR user2_id = $2);", [id, profile_id]);
        if(rows[0].user1_id ===profile_id && rows[0].user1_likes === true){
            await db.query("UPDATE matches SET user2_likes = true, match = true WHERE user1_id = $1 and user2_id = $2;",[profile_id, id])
        }else if (rows[0].user1_id ===profile_id) {
            await db.query("UPDATE matches SET user2_likes = true WHERE user1_id = $1 and user2_id = $2;",[profile_id, id])
        } else if (rows[0].user2_id ===profile_id && rows[0].user2_likes === true){
            await db.query("UPDATE matches SET user1_likes = true, match = true WHERE user2_id = $1 and user1_id = $2;",[profile_id, id])
        }
        else {
            await db.query("UPDATE matches SET user1_likes = true WHERE user2_id = $1 and user1_id = $2;",[profile_id, id])
        }
        
        res.send("yay")
    } catch(err){
        console.log(err);
    }
})

app.patch("/swipe-left/:id", async (req, res) => {
    try{
        const {id} = req.params;
        const {profile_id}= req.body;
        const {rows} = await db.query("select user1_id, user2_id FROM matches WHERE (user1_id = $1 OR user2_id=$1) AND (user1_id = $2 OR user2_id = $2);", [id, profile_id]);
        if(rows[0].user1_id ===profile_id){
            await db.query("UPDATE matches SET user2_likes = false, match = false WHERE user1_id = $1 and user2_id = $2;",[profile_id, id])
        }else {
            await db.query("UPDATE matches SET user1_likes = false, match = false WHERE user2_id = $1 and user1_id = $2;",[profile_id, id])
        }
        
        res.send("yay")
    } catch(err){
        console.log(err);
    }
})

app.get('/messages/:match_id', async (req,res)=>{
    try {
       const {match_id } = req.params;
    const { rows } = await db.query('SELECT message, user_id FROM messages WHERE match_id = $1;', [match_id])
    res.send(rows) 
    } catch(err){
        console.error(err);
    }
    
})

app.post('/messages/:match_id', async (req,res)=>{
    try{
        const {match_id} = req.params;
        const { user_id, text } = req.body;
        await db.query(`INSERT INTO messages VALUES (DEFAULT, $1, $2, $3);`,[match_id, user_id, text]);
        res.send("successfully sent")
    } catch (err){
        console.error(err);
    }
})

app.listen(3000, ()=>{
    console.log('Listening on port 3000!')
})