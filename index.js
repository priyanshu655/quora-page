const express=require("express");
const app=express();
const path=require("path");
app.set("view engine","ejs");
app.set("views",path.join(__dirname,"views"));
app.use(express.static(path.join(__dirname,"public")));
app.use(express.urlencoded({extended:true}));
const {v4:uuidv4}=require("uuid");
const methodOverride=require("method-override");
app.use(methodOverride('_method'));

uuidv4(); // ⇨ '9b1deb4d-3b7d-4bad-9bdd-2b0d7b3dcb6d'

let PORT=process.env.port||8080;


app.listen(PORT,()=>{
    console.log("listening on port: 8080");
});

let posts=[
    {
        id:uuidv4(),
        username:"priyanshu",
        content:"Work hard and dont expect something in return god sees every efforts!"
    },
    {
        id:uuidv4(),
        username:"apnacollege",
        content:"i love coding!"
    },
    {
        id:uuidv4(),
        username:"virat",
        content:"iam greatest of all time"
    }
];

app.get("/posts",(req,res)=>{
    res.render("index.ejs",{posts});
});

app.get("/posts/new",(req,res)=>{
    res.render("new.ejs");
});

app.post("/posts",(req,res)=>{
    let {username,content}=req.body;
    let id=uuidv4();
 posts.push({id,username,content});
 res.redirect("/posts");
});

app.patch("/posts/:id",(req,res)=>{
    let {id}=req.params;
    let newcontent=req.body.content;
    console.log("new");
    let post=posts.find(p=> id===p.id);
    post.content=newcontent;
    console.log(post);
    res.redirect("/posts");
});

// app.get("/posts/:id",(req,res)=>{
//     let {id}=req.params;
//     let post=posts.find(p=> id===p.id);
//     res.render("show.ejs",{post});
// });
// app.get("/posts/:id",(req,res)=>{
//     let {id}=req.params;
//     let post=posts.find(p=> id===p.id);

//     console.log("Requested ID:", id);
//     console.log("All IDs:", posts.map(p=>p.id));
//     console.log("FOUND POST:", post);

//     res.render("show.ejs",{post});
// });

app.get("/posts/:id", (req, res) => {
    let { id } = req.params;

    console.log("Requested ID:", id);
    console.log("All IDs:", posts.map(p => p.id));

    // Find the post
    let post = posts.find(p => p.id === id);

    console.log("FOUND POST:", post);

    // If not found → prevent crash
    if (!post) {
        return res.status(404).send(`
            <h1>❌ Post Not Found</h1>
            <p>The ID you requested does not exist:</p>
            <p><strong>${id}</strong></p>
            <a href="/posts">Go Back</a>
        `);
    }

    // Render only if valid
    res.render("show.ejs", { post });
});


app.get("/posts/:id/edit",(req,res)=>{
    let{id}=req.params;
    let post=posts.find(p=>id===p.id);
    console.log(post);
 res.render("new2.ejs",{post});
});

app.delete("/posts/:id",(req,res)=>{
    let {id}=req.params;
     posts=posts.filter((p)=>id!==p.id);
    res.redirect("/posts");
})