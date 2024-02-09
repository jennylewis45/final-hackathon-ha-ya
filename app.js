const express = require("express");
const Resultss = require("./mongo");
const bcryptjs = require("bcryptjs");
const jwt = require("jsonwebtoken");
const cors = require("cors");
const cookieParser = require("cookie-parser");


const app = express();

app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({ extended: false }));

// Enable CORS
app.use(cors());

async function hashPassword(password) {
    const res = await bcryptjs.hash(password, 10);
    return res;
}

async function comparePassword(userpass, hashpass) {
    const res = await bcryptjs.compare(userpass, hashpass);
    return res;
}

app.get("/", (req, res) => {
    if (req.cookies.jwt) {
        try {
            const verify = jwt.verify(req.cookies.jwt, "helloandwelcometotechywebdevtutorialonauthhelloandwelcometotechywebdevtutorialonauth");
            res.json({ name: verify.name });
        } catch (err) {
            console.error(err);
            res.status(500).send("Internal Server Error");
        }
    } else {
        res.status(404).send("Not Found");
    }
});

app.post("/signup", async (req, res) => {
    try {
        const check = await Resultss.findOne({ name: req.body.name });
        if (check) {
            res.status(400).json({ error: "User already exists" });
        } else {
            const token = jwt.sign({ name: req.body.name }, "helloandwelcometotechywebdevtutorialonauthhelloandwelcometotechywebdevtutorialonauth");
            res.cookie("jwt", token, {
                maxAge: 600000,
                httpOnly: true
            });

            const hashedPassword = await hashPassword(req.body.password);
            const data = {
                name: req.body.name,
                email: req.body.email,
                password: hashedPassword,
                token: token
            };
            await Resultss.insertMany([data]);
            res.json({ name: req.body.name });
        }
    } catch (error) {
        console.error(error);
        res.status(500).send("Internal Server Error");
    }
});

app.get("/login", (req, res) => {
    res.render("login");
});

app.post("/login", async (req, res) => {
    try {
        const check = await Resultss.findOne({ name: req.body.name });
        if (check) {
            const checkPass = await comparePassword(req.body.password, check.password);
            if (checkPass) {
                res.cookie("jwt", check.token, {
                    maxAge: 600000,
                    httpOnly: true
                });
                res.render("home", { name: req.body.name });
            } else {
                res.send("wrong details");
            }
        } else {
            res.send("user does not exist");
        }
    } catch (error) {
        console.error(error);
        res.status(500).send("Internal Server Error");
    }
});

app.get("/projects", async (req, res) => {
    try {
        const projects = await Resultss.find(); // Fetch all projects from database
        res.json(projects); // Send projects data as JSON response
    } catch (error) {
        console.error("Error fetching projects:", error);
        res.status(500).json({ error: "Failed to fetch projects. Please try again." });
    }
});

app.listen(8000, () => {
    console.log("app is listening on port 8000");
});

