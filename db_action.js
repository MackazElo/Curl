var express = require('express');

var router = express.Router();

var database = require('../database');

var last_id = 0

router.post("/action", function(request, response, next){

	var action = request.body.action;

	
	if(action == 'Start')
	{
		
		var date_time = new Date();
		var id = request.body.id;

		var Repair = request.body.Repair;

		var Health = request.body.Health;

		var Cycle = request.body.Cycle;
		var Level = request.body.Level;

		var Start = request.body.Start;

		var Last = request.body.Last;

		var Comment = request.body.Comment;
		var query = `
		INSERT INTO mark 
		(id, Repair, Health, Cycle, Start, Last, Comment, Level)
		VALUES ("", "${Repair}", "${Health}", "${Cycle}", "${date_time}", "${date_time}", "${Comment}", "${Level}")
		`;
		console.log(query)
		database.query(query, function(error, data){

			response.json({
				
			});
			console.log(query)

		});

		var query = "SELECT id FROM mark ORDER BY `id` DESC";

		database.query(query, function(error, data){
			last_id = data[0].id
		});
		console.log(last_id)
	}


	

	if(action == 'Now')
	{
		
		var id = request.body.id;
		console.log(id)
		var date_time = new Date();
		console.log(date_time);
		var query = `
		UPDATE mark 
		SET Last  = "${date_time}" 
		WHERE id = "${id}"
		`;

		database.query(query, function(error, data){
			response.json({
				message : 'Data Edited'
			});
		});
		console.log(query)
	}

	

	if(action == 'fetch')
	{
		var query = "SELECT * FROM mark ORDER BY id DESC";

		database.query(query, function(error, data){

			response.json({
				data:data
			});

		});
	}

	if(action == 'Add')
	{
		var id = request.body.id;

		var Repair = request.body.Repair;

		var Health = request.body.Health;

		var Cycle = request.body.Cycle;

		var Level = request.body.Level;

		var Start = request.body.Start;

		var Last = request.body.Last;

		var Comment = request.body.Comment;


		var query = `
		INSERT INTO mark 
		(id, Repair, Health, Cycle, Start, Last, Comment, Level)
		VALUES ("", "${Repair}", "${Health}", "${Cycle}", "${Start}", "${Last}", "${Comment}", "${Level}")
		`;

		database.query(query, function(error, data){

			response.json({
				message : 'Data Added'
			});

		});
	}

	if(action == 'fetch_single')
	{
		var id = request.body.id;

		var query = `SELECT * FROM mark WHERE id = "${id}"`;

		database.query(query, function(error, data){

			response.json(data[0]);

		});
	}

	if(action == 'Edit')
	{
		
		var id = request.body.id;

		var Repair = request.body.Repair;

		var Health = request.body.Health;

		var Cycle = request.body.Cycle;
		
		var Level = request.body.Level;

		var Start = request.body.Start;

		var Last = request.body.Last;

		var Comment = request.body.Comment;


		var query = `
		UPDATE mark 
		SET Repair = "${Repair}", 
		Health = "${Health}", 
		Cycle = "${Cycle}", 
		Start = "${Start}", 
		Last = "${Last}", 
		Comment = "${Comment}" 
		Level = "${Level}" 
		WHERE id = "${id}"
		`;

		database.query(query, function(error, data){
			response.json({
				message : 'Data Edited'
			});
		});
	}

	if(action == 'delete')
	{
		var id = request.body.id;

		var query = `DELETE FROM mark WHERE id = "${id}"`;

		database.query(query, function(error, data){

			response.json({
				message : 'Data Deleted'
			});

		});
	}

});





router.use('/', function(req, res, next) {
	res.render('index', { title: 'Express' });
  });


module.exports = router;