var app = require('express')();
var fs = require('fs');

app.get('/', function (req, res) {
    if (!req.params.id) {
        fs.readFile('./sheets/sheets.json', 'utf8', function (err, content) {
            var sheets = JSON.parse(content);
            var selectionScreen = "<html><h1>Select an Sheet:</h1>"
            for (var i = 0; i < sheets.length; i++) {
                selectionScreen += "<li><a href='/" + sheets[i].id + "'>" + sheets[i].name + "</a></li>";
            }
            selectionScreen += "</html>";
            res.send(selectionScreen);
        });
    }
});

app.get('/:id', function(req,res){
    var id = req.params.id;
    
    fs.readFile('./sheets/' + id + '.json', 'utf8', function (err, content) {
        var sheet = JSON.parse(content);
        sheetScreen = "<html><h1>" + sheet.name + "</h1>";
        for (var key in sheet) {
            sheetScreen += '<li>' + key + ': ' + sheet[key] + '</li>';
        }
        sheetScreen += "</html>";
        res.send(sheetScreen);
    });
});



app.listen(8083, () => console.log('YOUR SHEET IS RUNNING'));