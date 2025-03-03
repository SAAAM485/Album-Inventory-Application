const PASSWORD = "bagel"; // 設定你的密碼

const authenticate = (req, res, next) => {
    const auth = req.headers["authorization"];
    if (!auth) {
        res.setHeader("WWW-Authenticate", 'Basic realm="Secure Area"');
        return res.status(401).send("Access denied");
    }

    const receivedPassword = Buffer.from(auth.split(" ")[1], "base64")
        .toString()
        .split(":")[1]; // 只提取密碼部分

    if (receivedPassword === PASSWORD) {
        next();
    } else {
        res.setHeader("WWW-Authenticate", 'Basic realm="Secure Area"');
        res.status(401).send("Access denied");
    }
};

module.exports = authenticate;
