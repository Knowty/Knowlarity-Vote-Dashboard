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
