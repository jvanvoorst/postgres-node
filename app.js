var pg = require('pg');

var conStringDev = require('./connection.js');

var date = new Date('2016, 1, 1');

var query = "SELECT * FROM sierra_view.record_metadata INNER JOIN sierra_view.bib_view ON sierra_view.record_metadata.record_num = sierra_view.bib_view.record_num WHERE sierra_view.record_metadata.record_last_updated_gmt > $1 AND sierra_view.record_metadata.record_type_code = $2 AND sierra_view.bib_view.bcode3 = $3 ORDER BY sierra_view.record_metadata.record_last_updated_gmt ASC";

console.log('getting records updated since: ' + date);

var client = new pg.Client(conStringDev);
client.connect( function(err) {
    if(err) {
        return console.error('could not connect to postgres: ', err);
    }
    client.query(query, [date, 'b', '-'], function(err, result) {
        if(err) {
            return console.error('error running query', err);
        }
        console.log(result.rows);
        client.end();
    });
});