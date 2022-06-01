/*
 * Parse the data and create a graph with the data.
 */
var seriesname=[];
var seriesId = [];
var rating = ["ratings"];
var id=[];
let user;
let ty='';
let state=true;
let tableBody = '';
function parseData(createGraph) {
	Papa.parse("../data/ratings.csv", {
		download: true,
		complete: function(results) {
			createGraph(results.data);
		}
	});
}

function getseries(){
	Papa.parse("../data/series.csv", {
		download: true,
		complete: function(results) {
			get(results.data);
		}
	});
}
function get(info){
	for (var k=0; k<seriesId.length;k++){
		for (var j = 1; j< info.length; j++){
			if (info[j][0]==seriesId[k]){
				seriesname[k]=new Array(3);
				seriesname[k][1]=info[j][1];
				seriesname[k][2]=info[j][2];
				seriesname[k][3]=info[j][3];
			}
		}
	}
	console.log(seriesname);
	table();
}

function createGraph(data) {
	console.log(data);
	for (var i = 1; i < data.length; i++) {
		if(data[i][0]==user){
			id.push(data[i][0]);
			seriesId.push(data[i][1]);
			rating.push(data[i][2]);
		}
		else{
			continue;
		}
	}
	getseries();
	console.log(id,seriesId,rating,seriesname);
	var chart = c3.generate({
		bindto: '#chart',
	    data: {
	        columns: [
	        	rating
	        ],

			type: ty
	    },
	    axis: {
	        x: {
	            type: 'category',
	            categories: seriesId,
	            tick: {
	            	multiline: false,
                	culling: {
                    	max: 12
                	}
            	}
	        }
	    },
		bar:{
			width:{
				ratio:0.5
			}
		},
	    zoom: {
        	enabled: true
    	},
	    legend: {
	        position: 'bottom'
	    }
	});
}


function gradeTable ( seriesname ) {

	const tableHead = `
		<table >
			<thead>
				<tr class='highlight-row'>
					<th>Title</th>
					<th>Year</th>
					<th>Age</th>
				</tr>
			</thead>
			<tbody>
	`;

	const tableFoot = `
			</tbody>
		</table>
	`;

	for ( let i = 0; i < seriesname.length; i += 1 ) {

		let title = seriesname[i][1];
		let year = seriesname[i][2];
		let age = seriesname[i][3];
		tableBody += `
			<tr>
				<td>${title}</td>
				<td>${year}</td>
				<td>${age}</td>
			</tr>
		`
	}

	return tableHead + tableBody + tableFoot;
}
function table(){
document.querySelector('.tab')
	.insertAdjacentHTML(
		'afterbegin',
		gradeTable( seriesname)
	)}

	function processForm()
	{
	  var val = location.search.substring(1).split("&");
	  var temp = val[0].split("=");
	  user = unescape(temp[1]);
	  if (user>0 && user<11){
		parseData(createGraph);
	  }else{
		alert("Enter number between 1-10");
		 window.location.href="index.html";
	  }
	}
	if (state){
		processForm();
	}

function graphdisplay(){

		ty='bar'
		document.getElementById("grp").value="Graph Chart";

	state=false;
	seriesname=[];
	seriesId = [];
	rating = ["ratings"];
	id=[];
	tableBody='';
	document.querySelector('.tab').innerHTML="";
	parseData(createGraph);

}
