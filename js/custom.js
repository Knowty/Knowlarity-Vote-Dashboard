var options = {tooltipTemplate:
	" <%=label%>: <%= numeral(value).format('($00[.]00)') %> - <%= numeral(circumference / 6.283).format('(0[.][00]%)') %>"
   }
var data = {
    labels: [
        "Ninja",
        "Knowty",
        "Hackers"
    ],
		legends: {
			labels: function(chart){
				debugger
			}
		},
    datasets: [
        {
            data: [52, 19, 8],
            backgroundColor: [
                "#FF6384",
                "#36A2EB",
                "#FFCE56"
            ],
            hoverBackgroundColor: [
                "#FF6384",
                "#36A2EB",
                "#FFCE56"
            ]
        }]
};


ctx = $("#myChart")
var myDoughnutChart = new Chart(ctx, {
    type: 'doughnut',
    data: data,
		animation:{
        animateScale:true
    }
});

var leading_team = $("tr td:nth-child(2)").first().text()
$(".leading-team p").text(leading_team)


/* 
 Event source stuff
*/
eventSource = null

function connectToStream() {
    eventSource = new EventSource('http://52.50.164.222:8001/leaderboard-stream');
    eventSource.addEventListener('message', listener);
}

function listener(event) {
    data = JSON.parse(event.data)
    console.log(data);

    // If there are leaders.
    if (data.leaderboard.length) {
        $('#results').html('');
        $.each(data.leaderboard, function(index, row) {
            $('#results').append(`
                <tr>
                    <td>${index + 1}.</td>
                    <td>${row.team}</td>
                    <td>${row.hotline_number}</td>
                    <td>${row.votes}</td>
                </tr>
                `);
        });  

        total_vote_percentage = (data.participation_count / data.participant_count) * 100;
        $('#vote_total').text(`${data.participation_count}`);  
        $('#vote_engagement').text(`${total_vote_percentage}%`)
    }
    
    
}

connectToStream();
eventSource.addEventListener('message', listener);
eventSource.addEventListener('error', connectToStream);
