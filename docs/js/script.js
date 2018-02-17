window.onload = function() {
    'use strict';

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
            tooltip.select('.percent').html(Math.round(percent) + '%');
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

    var displayPersonality = function(dataset) {
        var sortedDataset = dataset.sort(function(a, b) {
            if (a.count < b.count) {
                return -1;
            }
            if (a.count > b.count) {
                return 1;
            }
            return 0;
        });

        var personality = sortedDataset[sortedDataset.length - 1];

        var trait;
        if (personality.label == "Excitement Seeker") {
            trait = "an " + personality.label;
        } else {
            trait = personality.label;
        }

        document.getElementById("personality").innerText = trait.toLowerCase();
        document.getElementById("personality-container").style.visibility = 'visible';
    };

    var getQueryParams = function(labels) {
        var params = (new URL(location)).searchParams;

        var filteredParams = {};
        labels.forEach(function(label) {
            var labelKey = labelToKey(label);
            filteredParams[label] = params.get(labelKey);
        });

        return filteredParams;
    };

    var labelToKey = function(label) {
        return label.toLowerCase().replace(/ +/g, "");
    };

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

    var params = getQueryParams(labels);

    var dataset = labels.map(function(label){
        if (params[label]) {
            return { label: label, count: params[label] };
        } else {
            return { label: label, count: Math.random() };
        }
    });

    var path = createPieChart(dataset, colors);
    addTooltips(path, dataset);
    displayPersonality(dataset);
};
