const express = require("express");
const router = express.Router();
const multer = require("multer");
const path = require("path");
const fs = require("fs");
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, "./static/");
    },
    filename: function (req, file, cb) {
        cb(
            null,
            new Date().toISOString().replace(/:/g, "-") + file.originalname
        );
    },
});

const fileFilter = (req, file, cb) => {
    if (
        file.mimetype === "image/jpeg" ||
        file.mimetype === "image/png" ||
        file.mimetype === "image/jpg"
    ) {
        cb(null, true);
    } else {
        cb(null, false);
        const err = new Error("Only .png, .jpg and .jpeg format allowed!");
        err.name = "ExtensionError";
        return cb(err);
    }
};

const upload = multer({
    storage: storage,
    limits: {
        fileSize: 1024 * 1024 * 5, // max image size = 5MB
    },
    fileFilter: fileFilter,
});

router.get("/image/get/:imageName", async (req, res) => {
    const imageName = req.params.imageName;
    const imagePath = path.join(
        path.dirname(require.main.filename),
        "static",
        imageName
    );

    console.log(imageName);
    console.log(imagePath);

    let isImgExists = false;
    fs.access(imagePath, () => {
        console.log('vutre sme - sushtestvuva');
        isImgExists = true;
        res.status(200).sendFile(imagePath);
    });

    setTimeout(() => {
        if(!isImgExists) {
            res.status(500).json({ Error: "Image does not exists" });
        }
    }, 1000);
});

router.post("/image", upload.single("uploadedImage"), (req, res) => {
    res.status(200).json({
        originalName: req.file.originalname,
        fileName: req.file.filename,
        message: "Your files uploaded.",
    });
});

module.exports = router;
