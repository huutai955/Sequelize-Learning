import express from "express";
import sequelize from "./db.js";
import { DataTypes, Model } from "sequelize";
const app = express()



app.get('/', async (req, res) => {
    const User = sequelize.define('User', {
        // Model attributes are defined here
        firstName: {
            type: DataTypes.STRING,
            allowNull: false
        },
        lastName: {
            type: DataTypes.STRING,
            allowNull: false
        }
    }, {
        // Other model options go here
    });
    await User.sync({ force: true });
    console.log("The table for the User model was just (re)created!");
    res.send("Testing sequelize")
})

app.get('/init', (req, res) => {
    // Valid
    class User extends Model {
        otherPublicField;
    }

    User.init({
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true
        }
    }, { sequelize });

    const user = new User({ id: 1 });
    console.log(user.id)
    res.send("Init")
})


app.listen(3000, () => {
    console.log("Server is running")
    sequelize.authenticate().then(() => {
        console.log('Connection has been established successfully.');
    }).catch((error) => {
        console.error('Unable to connect to the database: ', error);
    });
})