
var api = {}

var currentDate = new Date();
var previousDate = new Date();
previousDate.setDate(currentDate.getDate() - 7);
var delayedDate = new Date();
delayedDate.setDate(currentDate.getDate() - 14);

var negotiations = [
      { date : currentDate, quantity : 1, value : 150},
      { date : currentDate, quantity : 2, value : 250},
      { date : currentDate, quantity : 3, value : 350},
      { date : previousDate, quantity : 1, value : 450},
      { date : previousDate, quantity : 2, value : 550},
      { date : previousDate, quantity : 3, value : 650},
      { date : delayedDate, quantity : 1, value : 750},
      { date : delayedDate, quantity : 2, value : 950},
      { date : delayedDate, quantity : 3, value : 950}
    ];


api.listWeek = function(req, res) {
    var currentNegotiations = negotiations.filter(function(negotiation) {
        return negotiation.date > previousDate;
    });
    res.json(currentNegotiations);
};

api.listPrevious = function(req, res) {
   
   var previousNegotiations = negotiations.filter(function(negotiation) {
        return negotiation.date < currentDate && negotiation.date > delayedDate;
    });
	setTimeout(function() {
		res.json(previousNegotiations);	
	}, 500);
    
};

api.listDelayed = function(req, res) {

   var delayedNegotiations = negotiations.filter(function(negotiation) {
        return negotiation.date < previousDate;
    });
    res.json(delayedNegotiations);
    
};

api.saveNegotiation = function(req, res) {

   console.log(req.body);
   req.body.date = new Date(req.body.date.replace(/-/g,'/'));
   negociacoes.push(req.body);
   res.status(200).json("Negotiations received");
};



module.exports = api;