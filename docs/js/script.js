window.onload = function() {
    'use strict';

    var colorPalette = {
        "Assertive": "#951826",
        "Intelligent": "#bc5d57",
        "Excitement Seeker": "#c58e6f",
        "Sympathetic": "#b97d96",
        "Trustworthy": "#61515c",
        "Cautious": "#05636b",
        "Self Conscious": "#bad15f",
        "Emotional": "#8c8f94",
    };

    var labels = Object.keys(colorPalette);
    var colors = labels.map(function(label) { return colorPalette[label]; });

    var dataset = labels.map(function(label){
        var randomNumber = Math.random() * 100;
        return { label: label, count: randomNumber };
    });

    var width = 360;
    var height = 360;
    var radius = Math.min(width, height) / 2;
    var color = d3.scaleOrdinal().range(colors);

    var svg = d3.select('#chart')
        .append('svg')
        .attr('width', width)
        .attr('height', height)
        .append('g')
        .attr('transform', 'translate(' + (width / 2) +  ',' + (height / 2) + ')');

    var arc = d3.arc()
        .innerRadius(0)
        .outerRadius(radius);

    var pie = d3.pie()
        .value(function(d) { return d.count; })
        .sort(null);

    svg.selectAll('path')
        .data(pie(dataset))
        .enter()
        .append('path')
        .attr('d', arc)
        .attr('fill', function(d, i) {
            return color(d.data.label);
        });
};
