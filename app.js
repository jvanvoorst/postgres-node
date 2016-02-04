var pg = require('pg');

var conString = require('./connection.js');

var client = new pg.Client(conString);
client.connect( function(err) {
    if(err) {
        return console.error('could not connect to postgres', err);
    }
    client.query('SELECT rm.* FROM ".SIERRA_record_metadata." INNER JOIN ".SIERRA_bib_view." ON rm.record_num = bv.record_num WHERE rm.record_last_updated_gmt > '".$date."' AND rm.record_type_code = 'b' AND bv.bcode3 = '-' ORDER BY rm.record_last_updated_gmt ASC;', function(err, result) {
        if(err) {
            return console.error('error running query', err);
        }
        console.log(result.rows[0].theTime);
        client.end();
    });
});