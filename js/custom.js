var randomColorGenerator = function () { 
    return '#' + (Math.random().toString(16) + '0000000').slice(2, 8); 
};

function renderPieChart(labels, dataentries) {
    var options = {tooltipTemplate:
    " <%=label%>: <%= numeral(value).format('($00[.]00)') %> - <%= numeral(circumference / 6.283).format('(0[.][00]%)') %>"
   }
    var data = {
        labels: labels,
        legends: {
            labels: function(chart){
                debugger
        }
        },
        datasets: [
            {
                data: dataentries,
                backgroundColor: backgroundColors,
                hoverBackgroundColor: backgroundColors 
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


}

backgroundColors = [
                "#FF6384",
                "#36A2EB",
                "#FFCE56",
                '#4caf50',
                '#ded937',
                '#26a69a',
                '#a62696',
                '#b1f8fb',
                '#58163e',
                '#864603',
                '#ee6e73',
            ],


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

    teams = []
    vote_percentage = []

    // If there are leaders.
    if (data.leaderboard.length) {
        $('#results').html('');
        $.each(data.leaderboard, function(index, row) {
            teams.push(row.team);
            vote_percentage.push((row.votes / data.participation_count) * 100);

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
        $('#vote_total').text(`${data.participation_count} / ${data.participant_count}`);  
        $('#vote_engagement').text(`${total_vote_percentage.toFixed(2)}%`)
        $('#vote_last_hour').text(`${data.participation_count_last_hour}`);

        $('#poll_start_time').text(`${data.poll_start_time}`);
        $('#poll_end_time').text(`${data.poll_end_time}`);
        $('#last_updated').text(`${data.last_updated}`);

        renderPieChart(teams, vote_percentage);
    }
    
    
}

connectToStream();
renderPieChart([], []);

eventSource.addEventListener('message', listener);
eventSource.addEventListener('error', connectToStream);


