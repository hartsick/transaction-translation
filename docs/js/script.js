window.onload = function() {
    var addTooltips = function(path, dataset) {
        var tooltip = d3.select('#chart')
            .append('div')
            .attr('class', 'tooltip');

        tooltip.append('div')
            .attr('class', 'label');

        tooltip.append('div')
            .attr('class', 'count');

        tooltip.append('div')
            .attr('class', 'percent');

        path.on('mouseover', function(d) {
            var total = d3.sum(dataset.map(function(d) {
                return d.count;
            }));
            var percent = Math.round(1000 * d.data.count / total) / 10;
            tooltip.select('.label').html(d.data.label);
            tooltip.select('.percent').html(percent + '%');
            tooltip.style('display', 'block');
        });

        path.on('mouseout', function() {
            tooltip.style('display', 'none');
        });
    };

    var createPieChart = function(dataset, colors) {
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

        return svg.selectAll('path')
            .data(pie(dataset))
            .enter()
            .append('path')
            .attr('d', arc)
            .attr('fill', function(d, i) {
                return color(d.data.label);
            });
    };

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
        return { label: label, count: Math.random() };
    });

    var path = createPieChart(dataset, colors);
    addTooltips(path, dataset);
};
