var Schema = {
	eventos: {
    	id: {type: 'increments', nullable: false, primary: true},
		type: {type: 'integer', nullable: false},
    	name: {type: 'string', maxlength: 150, nullable: false},
		desc: {type: 'string', maxlength: 500, nullable: false},
		lat: {type: 'double', nullable: true},
		long: {type: 'double', nullable: true}
  },
	ofertas: {
    	id: {type: 'increments', nullable: false, primary: true},
		type: {type: 'integer', nullable: false},
    	name: {type: 'string', maxlength: 150, nullable: false},
		desc: {type: 'string', maxlength: 500, nullable: false},
		local: {type: 'string', maxlength: 150, nullable: true}
  },
  	reports: {
    	id: {type: 'increments', nullable: false, primary: true},
		type: {type: 'integer', nullable: false},
    	name: {type: 'string', maxlength: 150, nullable: false},
		desc: {type: 'string', maxlength: 500, nullable: false},
		lat: {type: 'double', nullable: true},
		long: {type: 'double', nullable: true},
		date: {type: 'dateTime', nullable: true}
  }
};
module.exports = Schema;
