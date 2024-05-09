import { client } from "../pg.cjs";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

export const register = async (req, res, next) => {
    try {
        const salt = bcrypt.genSaltSync(10);
        const hash = bcrypt.hashSync(req.body.password, salt);
        const name = req.body.name;
        const email = req.body.email;
        const newUser = {
            name: req.body.name,
            email: req.body.email
        }
        const isthere = await client.query(
            `select count(*) from users where email='${email}'`
        );

        if (parseInt(isthere.rows[0].count) > 0) {
            res.send("Email already registered")
        } else {
            const query = `
          insert into users(name,password,email) values($1,$2,$3)`;
            const values = [name, hash, email];
            const token = jwt.sign({ id: req.body.email }, process.env.JWT);

            res.cookie("access_token", token, {
                httpOnly: true,
                maxAge: 2 * 60 * 60 * 1000
            }).status(200).json({
                newUser
            });
            await client.query(query, values);

        }
    } catch (err) {
        res.send(err)
    }
};

export const login = async (req, res, next) => {
    try {
        const email = req.body.email;

        const newUser = {
            email: req.body.email
        }
        const isthere = await client.query(
            `select count(*) from users where email='${email}'`
        );

        if (parseInt(isthere.rows[0].count) == 0) {
            res.send('Email not registered');
        }
        else {
            const token = jwt.sign({ id: req.body.email }, process.env.JWT);

            res.cookie("access_token", token, {
                httpOnly: true,
                maxAge: 2 * 60 * 60 * 1000
            }).status(200);
            const passFromTable = await client.query(
                `select * from users where email='${email}'`
            );
            const isCorrect = await bcrypt.compare(req.body.password, passFromTable.rows[0].password);
            if (isCorrect) {

                res.json({
                    messege: "LOg"
                })
            }
            else {
                res.json({messege:'Incorrect password'});
            }
        }
    } catch (err) {
        res.send(err);
    }
};

export const logout = async (req, res, next) => {
    try {
        res.clearCookie('access_token')
        res.json({
            messege:"cookie cleared"
        })
    } catch (err) {
        res.send(err);
    }
};