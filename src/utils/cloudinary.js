import cloudinary from "cloudinary";

export const cloudinaryBase64Upload = async (base64, w = 400) => {
    return new Promise((resolve, reject) => {
        cloudinary.v2.uploader.upload(
            base64,
            {
                width: w,
            },
            function (error, result) {
                if (error) reject(error);
                resolve({
                    uid: result.public_id,
                    type: base64.substring("data:".length, base64.indexOf(";base64")),
                    name: result.public_id + "." + result.format,
                    url: result.secure_url,
                });
            }
        );
    });
};
