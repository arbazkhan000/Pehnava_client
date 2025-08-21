import { generateToken } from "../../utils/jwtToken.js";
import Auth from "../schema/authSchema.js";

class userController {
    // REGISTER
    static async register(req, res) {
        try {
            const { name, email, password } = req.body;

            if (!name || !email || !password) {
                return res.status(400).json({
                    success: false,
                    message: "Please provide name, email, and password",
                });
            }

            const existingUser = await Auth.findOne({
                email: email.toLowerCase().trim(),
            });
            if (existingUser) {
                return res
                    .status(400)
                    .json({ success: false, message: "Email already in use" });
            }

            const user = await Auth.create({
                name: name.trim(),
                email: email.toLowerCase().trim(),
                password,
            });

            const token = generateToken({ id: user._id, role: user.role });

            res.status(201).json({
                success: true,
                message: "User registered successfully",
                user: { name: user.name, email: user.email, role: user.role },
                token,
            });
        } catch (err) {
            console.error("Register Error:", err.message);
            res.status(500).json({
                success: false,
                message: "Internal server error",
            });
        }
    }

    // LOGIN
    static async login(req, res) {
        try {
            const { email, password } = req.body;

            if (!email || !password) {
                return res
                    .status(400)
                    .json({
                        success: false,
                        message: "Email and password required",
                    });
            }

            const user = await Auth.findOne({
                email: email.toLowerCase().trim(),
            });
            if (!user) {
                return res
                    .status(401)
                    .json({
                        success: false,
                        message: "Invalid email or password",
                    });
            }

            const isMatch = await user.comparePassword(password);
            if (!isMatch) {
                return res
                    .status(401)
                    .json({
                        success: false,
                        message: "Invalid email or password",
                    });
            }

            const token = generateToken({ id: user._id, role: user.role });

            res.status(200).json({
                success: true,
                message: "Login successful",
                user: { name: user.name, email: user.email, role: user.role },
                token,
            });
        } catch (err) {
            console.error("Login Error:", err.message);
            res.status(500).json({
                success: false,
                message: "Internal server error",
            });
        }
    }

    // GET PROFILE
    static async profile(req, res) {
        try {
            const user = await Auth.findById(req.user.id).select("-password");
            if (!user)
                return res
                    .status(404)
                    .json({ success: false, message: "User not found" });

            res.status(200).json({
                success: true,
                user: { name: user.name, email: user.email, role: user.role },
            });
        } catch (err) {
            console.error("Profile Error:", err.message);
            res.status(500).json({
                success: false,
                message: "Internal server error",
            });
        }
    }
}

export default userController;
