const path = require('path');
const fs = require('fs');

const imageToBase64 = require('image-to-base64');

function makeUserDir(userID) {
    if (!fs.existsSync(`./uploads/${userID}`)) {
        fs.mkdirSync(`./uploads/${userID}`);
    }
    return `./uploads/${userID}/`;
}


function base64ToImg(userID, imageURI, eventID) {
    const str = 'data:image/png;base64,';

    const buffer = Buffer.from(imageURI, 'base64');

    const path = makeUserDir(userID);

    let res = '';
    
    fs.writeFile(path + `${eventID}.png`, buffer, err => {
        if (err) {
            console.error(err);
            return
        }
    });
    return path + `${eventID}.png`;
}



module.exports = {
    makeUserDir,
    base64ToImg,
    imageToBase64
};