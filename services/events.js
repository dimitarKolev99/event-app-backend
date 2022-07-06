const db = require('./db');
const helper = require('../helper');
const config = require('../config');
const imageHelper = require('./imageHelper');

async function getMultiple(page = 1, organizer_id) {
    const offset = helper.getOffset(page, config.listPerPage);
    const rows = await db.query(
        'SELECT * FROM events WHERE organizer_id != $1 OFFSET $2 LIMIT $3',
        [organizer_id, offset, config.listPerPage]
    );

    // console.log(rows.length);
    
    // console.log(imageHelper.imageToBase64(rows[0].imageuri));
    
    for (let i = 0; i < rows.length; i++) {
        if (rows[i].imageuri != undefined) {
            rows[i].base64Img = await imageHelper.imageToBase64(rows[i].imageuri);    
            // console.log(rows[i].base64Img);
        }
    }
    
    const data = helper.emptyOrRows(rows);

    // console.log(data[0].base64Img);

    const meta = {page};

    return data;

}

async function create(event) {

    if (typeof(event.base64Img) === undefined) {
        console.log('UNDEF');
    };

    const imageURI = imageHelper.base64ToImg(event.organizerID, event.base64Img, event.eventID);
    
    let result;
    console.log(imageURI);
    if (imageURI != '') {
        result = await db.query(
                'INSERT INTO events(event_id, organizer_id, title, imageURI) VALUES ($1, $2, $3, $4) RETURNING *',
                [event.eventID, event.organizerID, event.title, imageURI]
            );
        } else {
            result = await db.query(
                'INSERT INTO events(event_id, organizer_id, title) VALUES ($1, $2, $3) RETURNING *',
                [event.eventID, event.organizerID, event.title]
                );
        }


    let message = 'Error in creating event';

    if (result.length) {
        message = 'Event created successfully';
    }

    return {message};
}

module.exports = {
    getMultiple,
    create
};