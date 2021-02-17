const name = "mario";
console.log(name);
console.log( `hello ${name} how are you?`);
function greet(name){
	console.log(`hello ${name} how are you`);
}
greet('betty');
greet('pippie');

const greet1 = (name)=>console.log(`${name}`);
greet1('name1');
greet1('name2');


setTimeout(function(){
	console.log('here');
},3000);
console.log(__dirname);
console.log(__filename);
//console.log(global);
const os = require('os');
console.log(os.platform());
const fs = require('fs');
//console.log(fs);
pathname = (__dirname);
pathname = 'c:/users/bvend/downloads/testing1.txt';
pathnamewrite = 'c:/users/bvend/downloads/writing1.txt';
console.log(pathname);
fs.readFile(pathname,function(err,data){
if (err){
	console.log(err);
} else {
		
	//console.log(data.toString());
}

});
/*

fs.writeFile(pathname,'new sync text',function(err){

	if (err){
	console.log(err);
	}

});
*/

if (fs.existsSync,pathname){
	console.log('exists');

}
const readstream = fs.createReadStream(pathname,{encoding:'utf8'});
readstream.on('data',function(chunk){
	console.log('starting');
	console.log(chunk);
});
const writestream = fs.createWriteStream(pathnamewrite,{encoding:'utf8'});
/*
readstream.on('data',function(chunk){
	console.log('starting');
	console.log(chunk);
	writestream.write('\nNewLine\n');
	writestream.write(chunk);
});
*/
readstream.pipe(writestream); //*this pipes the entire readstream to the writestream
