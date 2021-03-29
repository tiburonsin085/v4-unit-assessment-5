const bcrypt = require('bcryptjs')

module.exports = {
    register: async (req, res) => {
        const db = req.app.get('db')
        const {username, password} = req.body
        try{
            const [existingUserName] = await db.user.finder(username)
            if(existingUserName){
                return res.status(409).send('This Usename is Take Sorry Brow')

            }

            const salt = bcrypt.genSaltSync(10)
            const hash = bcrypt.hashSync(password,salt)

            const [newUser] = await db.user.create_user(username,hash,`https://robohash.org/${username}.png`)

            req.session.user = newUser

            res.status(200).send(newUser)
        }catch (err){
            console.log(err)
            return res.sendStatus(500)
        }
        

    
    },
    login: async (req, res) => {
        const db = req.app.get('db')
        const {username, password } = req.body

        db.user.finder(username)
            .then(([existingUser])=> {
                if (!existingUser){
                    return res.status(403).send('This is an incorrect username ma friend ')
                }
                const isAuthenticated = bcrypt.compareSync (password, existingUser.password)

                if (!isAuthenticated){
                    return res.status(403).send('No bro you can t do that think in your password again')
                }

                delete existingUser.password

                req.session.user = existingUser

                res.status(200).send(req.session.user)

                console.log(req.session.user)
            })


    },
    logout: (req,res) => {
        req.session.destroy()
        res.sendStatus(200);
        console.log(req.session)

    },
    getUser:  (req, res) => {
        const {user} = req.session
        if (!user){
            return res.status(404).send('you are not login')
        }

        res.status(200).send(user)
        }
    }

