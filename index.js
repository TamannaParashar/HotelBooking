const express = require('express')
const bodyParser = require('body-parser')
const app = express();
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(express.static(__dirname));
app.use('/admin',express.static(__dirname+'/Admin'))

const client = require('./database/db')
function saveBooking(data,callback){
const query = 'INSERT INTO bookings(full_name,email,phone,check_in,check_out,adults,children,room_type,special_requests) values($1,$2,$3,$4,$5,$6,$7,$8,$9)';
 const bookingvalues = [
        data.full_name,
        data.email,
        data.phone,
        data.check_in,
        data.check_out,
        data.adults,
        data.children,
        data.room_type,
        data.special_requests
    ];

    client.query(query, bookingvalues, callback);
}
app.post('/api/bookings', (req, res) => {
    saveBooking(req.body, (err, result) => {
        if (err) {
            console.error('Booking insert failed:', err);
            res.status(500).send('Failed to save booking');
        } else {
            res.status(200).send('Booking successful!');
        }
    });
});
const getBooking = ()=>{
    const query = 'SELECT * FROM bookings'
    client(query)
}
app.get('/api/allbookings',(req,res)=>{
    client.query('SELECT * from bookings order by check_in desc',(err, result) => {
        if (err) {
            console.error('Error fetching bookings:', err);
            res.status(500).json({ message: 'Error retrieving bookings' });
        } else {
            res.status(200).json(result.rows);
        }
    });
});
const PORT = 3000;
app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));