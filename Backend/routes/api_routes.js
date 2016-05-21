var express = require('express');
var router = express.Router();
var knex = require('../dbconnect.js');

var Bookshelf = require('bookshelf')(knex);

//models
var Evento = Bookshelf.Model.extend({
    tableName: 'eventos',
});

var Oferta = Bookshelf.Model.extend({
    tableName: 'ofertas'
});

var Report = Bookshelf.Model.extend({
    tableName: 'reports'
});

//collections
var Eventos = Bookshelf.Collection.extend({
  model: Evento
});

var Ofertas = Bookshelf.Collection.extend({
  model: Oferta
});

var Reports = Bookshelf.Collection.extend({
  model: Report
});


//Evento API
router.route('/eventos')
  // fetch all eventos
  .get(function (req, res) {
    Eventos.forge()
    .fetch()
    .then(function (collection) {

        res.header("Access-Control-Allow-Origin", "*");
        res.header("Access-Control-Allow-Headers", "X-Requested-With");
        res.header("Access-Control-Allow-Headers", "Content-Type");
        res.header("Access-Control-Allow-Methods", "PUT, GET, POST, DELETE, OPTIONS");
      res.json({error: false, evento: collection.toJSON()});
    })
    .catch(function (err) {
      res.status(500).json({error: true, evento: {message: err.message}});
    });
  })
  // create a evento
  .post(function (req, res) {
    Evento.forge({
      name: req.body.name,
      type: req.body.type,
      desc: req.body.desc,
      lat: req.body.lat,
      long: req.body.long
    })
    .save()
    .then(function (evento) {
      res.json({error: false, evento: {id: evento.get('id')}});
    })
    .catch(function (err) {
      res.status(500).json({error: true, user: {message: err.message}});
    }); 
  });

router.route('/eventos/id')
  // fetch user
  .post(function (req, res) {
    Evento.forge({id: req.body.id})
    .fetch()
    .then(function (evento) {
      if (!evento) {
	res.status(404).json({error: true, evento: {}});
      }
      else {
	res.json({error: false, evento: evento.toJSON()});
      }
    })
    .catch(function (err) {
      res.status(500).json({error: true, evento: {message: err.message}});
    });
  })
  .delete(function (req, res) {
    Evento.forge({id: req.body.id})
    .fetch({require: true})
    .then(function (evento) {
      evento.destroy()
      .then(function () {
	res.json({error: true, evento: {message: 'Evento successfully deleted'}});
      })
      .catch(function (err) {
	res.status(500).json({error: true, evento: {message: err.message}});
      });
    })
    .catch(function (err) {
      res.status(500).json({error: true, evento: {message: err.message}});
    });
  });

//Ofertas API
router.route('/ofertas')
  // fetch all ofertas
  .get(function (req, res) {
    Ofertas.forge()
    .fetch()
    .then(function (collection) {
        res.header("Access-Control-Allow-Origin", "*");
        res.header("Access-Control-Allow-Headers", "X-Requested-With");
        res.header("Access-Control-Allow-Headers", "Content-Type");
        res.header("Access-Control-Allow-Methods", "PUT, GET, POST, DELETE, OPTIONS");
      res.json({error: false, oferta: collection.toJSON()});
    })
    .catch(function (err) {
      res.status(500).json({error: true, oferta: {message: err.message}});
    });
  })
  // create a evento
  .post(function (req, res) {
    Oferta.forge({
      name: req.body.name,
      type: req.body.type,
      desc: req.body.desc,
      local: req.body.local
    })
    .save()
    .then(function (oferta) {
      res.json({error: false, oferta: {id: oferta.get('id')}});
    })
    .catch(function (err) {
      res.status(500).json({error: true, oferta: {message: err.message}});
    }); 
  });

router.route('/ofertas/id')
  // fetch oferta
  .post(function (req, res) {
    Oferta.forge({id: req.body.id})
    .fetch()
    .then(function (oferta) {
      if (!oferta) {
  res.status(404).json({error: true, oferta: {}});
      }
      else {
  res.json({error: false, oferta: Oferta.toJSON()});
      }
    })
    .catch(function (err) {
      res.status(500).json({error: true, oferta: {message: err.message}});
    });
  })
  .delete(function (req, res) {
    Oferta.forge({id: req.body.id})
    .fetch({require: true})
    .then(function (Oferta) {
      oferta.destroy()
      .then(function () {
  res.json({error: true, oferta: {message: 'Oferta successfully deleted'}});
      })
      .catch(function (err) {
  res.status(500).json({error: true, oferta: {message: err.message}});
      });
    })
    .catch(function (err) {
      res.status(500).json({error: true, oferta: {message: err.message}});
    });
  });

router.route('/reports')
  // fetch all reports
  .get(function (req, res) {
    Reports.forge()
    .fetch()
    .then(function (collection) {

        res.header("Access-Control-Allow-Origin", "*");
        res.header("Access-Control-Allow-Headers", "X-Requested-With");
        res.header("Access-Control-Allow-Headers", "Content-Type");
        res.header("Access-Control-Allow-Methods", "PUT, GET, POST, DELETE, OPTIONS");
      res.json({error: false, report: collection.toJSON()});
    })
    .catch(function (err) {
      res.status(500).json({error: true, report: {message: err.message}});
    });
  })
  // create a report
  .post(function (req, res) {
    Report.forge({
      name: req.body.name,
      type: req.body.type,
      desc: req.body.desc,
      lat: req.body.lat,
      long: req.body.long 
    })
    .save()
    .then(function (report) {
      res.json({error: false, report: {id: report.get('id')}});
    })
    .catch(function (err) {
      res.status(500).json({error: true, report: {message: err.message}});
    }); 
  });

router.route('/reports/id')
  // fetch reports
  .post(function (req, res) {
    Report.forge({id: req.body.id})
    .fetch()
    .then(function (report) {
      if (!report) {
  res.status(404).json({error: true, report: {}});
      }
      else {
  res.json({error: false, report: evento.toJSON()});
      }
    })
    .catch(function (err) {
      res.status(500).json({error: true, report: {message: err.message}});
    });
  })
  .delete(function (req, res) {
    Report.forge({id: req.body.id})
    .fetch({require: true})
    .then(function (report) {
      report.destroy()
      .then(function () {
  res.json({error: true, report: {message: 'Report successfully deleted'}});
      })
      .catch(function (err) {
  res.status(500).json({error: true, report: {message: err.message}});
      });
    })
    .catch(function (err) {
      res.status(500).json({error: true, report: {message: err.message}});
    });
  });

module.exports = router;
