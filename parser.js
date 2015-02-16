var fs = require('fs');
var xp = require('xml2js');


var parseFile = function(inFile, outFile) {
    fs.readFile(inFile, function(err, xml) {
        if (err) {
            console.log('Error reading XML file: ' + err.message);
            return(1);
        } else {
            var dir = "./";
            if (outFile.indexOf('/') != -1) {
                var path = outFile.split('/');
                dir = path.splice(0,path.length).join("/");
            }
            fs.access(dir, 'w', function(err) {
                if (err) {
                    console.log('Error opening output file: ' + err.message);
                    return(1);
                } else {
                    parseXML(xml, function(err, text) {
                        if(err) {
                            console.log('Error parsing XML: ' + err.message);
                            return(1);
                        } else {
                            fs.appendFile(outFile, text);
                        }


                    });

                    console.log('Finished Parsing!');
                    return(0);
                }
            })
        }
    });
};


var parseXML = function(xml, callback) {
    var parser = new xp.Parser();
    parser.parseString(xml, function(err, result) {
        if (err) {
            callback(err, null);
        }
        var page = result.alto.Layout[0].Page[0].PrintSpace;
        parsePage(page, function(text) {
            callback(null, text);
        });
    })
};


var parsePage = function(obj, callback) {
    Object.getOwnPropertyNames(obj).forEach(function(val) {
        if(val == "String") {
            for(var i = 0; i < obj[val].length; i++) {
                callback(obj[val][i]['$'].CONTENT);
                if (i < obj[val].length-1) {
                    callback(' ');
                } else {
                    callback("\r\n");
                }
            }
        }
        else if(typeof(obj[val]) == "object" && val != "$") {
            parsePage(obj[val], function(res) {
                callback(res);
            });
        }
    });
};

var printHelp = function() {
    var path = process.argv[1].split('/');
    var script = path[path.length-1];
    console.log('Usage:');
    console.log(process.argv[0] + ' ' + script + " [input file].xml [output file].txt to run from the console");
};


if (process.argv.length < 3) {printHelp();}
else {parseFile(process.argv[2], process.argv[3]);}