const Admin = require("../models").Admin
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

const create = async (req, res) => {
    try {
        const {name, email, password} = req.body
        let encryptedPassword = await bcrypt.hash(password, 10);
        const newAdmin = await Admin.create({
            name, email:email.toLowerCase(), password: encryptedPassword
        })

        return res.json(newAdmin)
    } catch (e) {
        console.log('something went wrong', e)
    }
}

const login = async (req, res) => {
    try {
        const {email, password} = req.body;

        if (!(email && password)) {
            return res.json({
                error: ["Password and email are required fields"],
            });
        }

        const user = await Admin.findOne({
            where: {email: email.toLowerCase()},
        });

        if (user && (await bcrypt.compare(password, user.password))) {
            const token = jwt.sign(
                {user_id: user.id, email},
                process.env.TOKEN_KEY
            );
            user.token = token;
            user.save();
            return res.status(200).json({admin:user,success:true});
        }
        return res.json({error: ["Invalid credentials"]});
    } catch (e) {
        console.log("something went wrong")
    }
}

const logout = async (req, res) => {
    try {
        const {id} = req.body
        const admin = await Admin.findByPk(id)
        admin.token = null
        await admin.save()
        return res.json({success:true})
    } catch (e) {
        console.log('something went wrong', e)
    }
}


module.exports = {
    create,
    login,
    logout
}