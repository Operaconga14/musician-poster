const { auth_jwt, upload, cors_option } = require("../../config/config")
const { express, bcrypt, jwt, cookie_parser, Readable, cloudinary, Op, cors } = require("../../config/node_packages")
const { authenticate_user } = require("../../helper/jwt")
const User = require("../../models/user_model")
const { checkIfEmailExists } = require("./user_controller")
const router = express.Router()

// middleware config
router.use(cookie_parser())
router.use(cors(cors_option))

// testing route
router.get(`/`, (req, res) => {
    return res.status(200).json({ message: 'User Api working' })
})

// register route
router.post('/auth/register', async (req, res) => {
    const { name, email, username, role, password } = req.body
    try {

        // check if email exists
        checkIfEmailExists(email)
            .then(async exists => {
                if (exists) {
                    return res.status(401).json({ message: 'Email Exists use another valid email address' })
                }

                // hash password
                auth_jwt.salt = await bcrypt.genSalt(10)
                auth_jwt.hashed_password = await bcrypt.hash(password, auth_jwt.salt)

                // default profile picture
                auth_jwt.default_picture = "https://res.cloudinary.com/defmlxshw/image/upload/v1722939368/profile-image/lzcm73qdev3ngcoe2slq.png"

                // register user and ave it into the database
                auth_jwt.user = await User.create({ name: name, email: email, username: username, role: role, picture: auth_jwt.default_picture, password: auth_jwt.hashed_password, createdAt: Date.now(), updatedAt: Date.now() })
                return res.status(201).json({ message: 'Registration successful' })

            })

    } catch (err) {
        return res.status(500).json({ message: 'Database error', err })
    }
})

// login route
router.post('/auth/login', async (req, res) => {
    const { email, password } = req.body
    try {
        // check if there is any email requested in the database
        auth_jwt.user = await User.findOne({
            where: { email: email }, attributes: {
                exclude: password
            }
        })

        if (!auth_jwt.user) {
            return res.status(401).json({ message: 'User not found or wrong email and password' })
        }

        // compare password
        auth_jwt.is_match = await bcrypt.compare(password, auth_jwt.user.password)
        if (!auth_jwt.is_match) {
            return res.status(401).json({ message: 'Wrong or incorrect password' })
        }

        // generate and verify generated token
        auth_jwt.payload = ({ email: auth_jwt.user.email })
        auth_jwt.token = await jwt.sign(auth_jwt.payload, auth_jwt.secret, { expiresIn: '1d' })

        // store token in encrypted cookies
        res.cookie('token', auth_jwt.token, {
            httpOnly: true, // Prevents JavaScript from accessing the token
            secure: true,   // Ensure the cookie is only sent over HTTPS
            sameSite: 'strict', // Adjust for cross-site requests if needed
            maxAge: 24 * 60 * 60 * 1000, // 1 day in milliseconds
        })

        // return success with token details
        res.status(201).json({ message: 'Login successful', token: auth_jwt.token })

    } catch (err) {
        return res.status(500).json({ message: 'Database error', err })
    }
})

// get user profile
router.get('/me', authenticate_user, async (req, res) => {
    try {
        const email = req.user.email
        auth_jwt.user = await User.findOne({ where: { email: email }, attributes: { exclude: ['password', 'id'] } })
        if (!auth_jwt.user) {
            return res.status(404).json({ message: 'User not found' })
        }

        // show user details
        res.status(201).json({ user: auth_jwt.user })

    } catch (err) {
        console.error(err)
        return res.status(500).json({ message: 'Database error', err })
    }
})

// upload profile image
router.put('/picture', authenticate_user, upload.single('picture'), async (req, res) => {
    // const picture = req.file
    try {
        if (!req.file) {
            return res.status(400).json({ message: 'No file uploaded' });
        }

        // check if the user has a record in the database
        const email = req.user.email
        auth_jwt.user = await User.findOne({ where: { email: email }, attributes: { exclude: ['password', 'id'] } })
        if (!auth_jwt.user) {
            return res.status(404).json({ message: 'User not found' })
        }

        // Convert the buffer to a readable stream
        const readStream = new Readable()
        readStream.push(req.file.buffer)
        readStream.push(null)

        // Upload image to Cloudinary directly from the buffer
        const cloudinaryResponse = await new Promise((resolve, reject) => {
            const uploadStream = cloudinary.uploader.upload_stream(
                { folder: 'profile-image' },
                (error, result) => {
                    if (error) reject(error)
                    else resolve(result)
                }
            )
            readStream.pipe(uploadStream)
        })


        // store the image to the database profile picture
        auth_jwt.user = await User.update({ picture: cloudinaryResponse.secure_url, updatedAt: Date.now() }, { where: { email: email } })
        return res.json({ message: 'Profile image uploaded successfully' })

    } catch (err) {
        return res.status(500).json({ message: `Cloudinary or database Error`, err })
    }
})

// update user info
router.put('/me/update', authenticate_user, async (req, res) => {
    const email = req.user.email
    const {
        facebook, instagram, youtube, audiomack, tiktok,
        boomplay, applemusic, spotify, contact, role } = req.body

    try {
        // first of all find the user
        auth_jwt.user = await User.findOne({ where: { email: email }, attributes: { exclude: ['password', 'id'] } })
        if (!auth_jwt.user) {
            return res.status(404).json({ message: 'User not found' })
        }

        // update user info
        auth_jwt.user = await User.update({
            facebook: facebook, instagram: instagram, youtube: youtube,
            audiomack: audiomack, tiktok: tiktok, boomplay: boomplay,
            applemusic: applemusic, spotify: spotify, contact: contact, role: role
        },
            { where: { email: email } }
        )
        return res.status(201).json({ message: 'User updated successfully' })

    } catch (err) {
        return res.status(500).json({ message: 'Database error', err })
    }
})

module.exports = router
