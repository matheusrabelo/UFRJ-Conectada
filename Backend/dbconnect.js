var knex = null;

module.exports = (function () {
if (knex) {
return knex;
}

knex = require('knex')({
    client: 'mysql',
    connection: {
        host     : 'us-cdbr-iron-east-04.cleardb.net',
        user     : 'b21f41991ee78f',
        password : '08e3a10e',
        database : 'heroku_b13ba9079173d1c',
        charset  : 'utf8'
	//mysql://baf560f925da15:1307d27c@us-cdbr-iron-east-03.cleardb.net/heroku_9ea164ae851c258?reconnect=true
    //mysql://b2fd04cfeb1d93:6141756a@us-cdbr-iron-east-04.cleardb.net/heroku_571965c6543e26d?reconnect=true  
    //mysql://b21f41991ee78f:08e3a10e@us-cdbr-iron-east-04.cleardb.net/heroku_b13ba9079173d1c?reconnect=true
  }
});


return knex;
})();
