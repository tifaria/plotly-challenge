
function init() {
    var selector = d3.select("#selDataset");

    d3.json("samples.json").then((data) => {
        var sample_names = data.names;

        sample_names.forEach((sample) => {
            selector.append("option")
                .text(sample)
                .property("value", sample);
        });

        var sample = sample_names[0];
        buildMetadata(sample);
        buildCharts(sample);
    });

}

function buildCharts(sample) {
    d3.json("samples.json").then((data) => {
        var samples = data.samples;
        var resultArray = samples.filter(sampleObj => sampleObj.id == sample);
        console.log(resultArray);
        var result = resultArray[0];
        console.log(result);

        var otu_ids = result.otu_ids;
        var otu_labels = result.otu_labels;
        var sample_values = result.sample_values;

       // 1. Bubble chart
        var bubbleLayout = {
            title: "Bacteria Cultures Per Samples",
            hovermode: "closest",
            xaxis: {
                title: "OTU ID"
            }
        };

        var bubbleTrace = {
            x: otu_ids,
            y: sample_values,
            text: otu_labels,
            mode: "markers",
            marker: {
                size: sample_values,
                color: otu_ids,
                colorscale: "Earth"
            }
        };

        var bubbleData = [bubbleTrace];

        Plotly.newPlot("bubble", bubbleData, bubbleLayout);

        // 2. Bar Plot
        var yticks = otu_ids.slice(0, 10).map(otu_id => `OTU${otu_id}`).reverse();

        var barData = [{
            x: sample_values.slice(0, 10).reverse(),
            y: yticks,
            text: otu_labels.slice(0, 10).reverse(),
            type: "bar",
            orientation: "h"
        }];

        var barLayout = {
            title: "Top 10 Bacteria Cultures Found"
        };

        Plotly.newPlot("bar", barData, barLayout);
    })
}

function optionChanged(sample) {
    buildMetadata(sample);
}

function buildMetadata(sample) {
    
    d3.json("samples.json").then((data) => {
        var metadata = data.metadata;
        var resultArray = metadata.filter(sampleObj => sampleObj.id == sample)
        var result = resultArray[0];
        
        var metadataPanel = d3.select("#sample-metadata");
        metadataPanel.html('');

        Object.entries(result).forEach(([key, value]) => {
            metadataPanel.append('h6').text(`${key}: ${value}`);
        })
    });
}

init();



// function buildPlot(sample) {
//     d3.json("data/samples.json").then(function(data) {
//         // console.log(data);
//         var samples = data.samples;
//         var resultArray = samples.filter(sampleObj => sampleObj.id == sample);
//         var result = resultArray[0];
//         var otu_ids = result.otu_ids;
//         var otu_labels = result.otu_labels;
//         var sample_values = result.sample_values;

//         var trace1 = {
//             x: otu_ids,
//             y: sample_values,
//             text: otu_labels,
//             mode: "markers",
//             marker: {
//                 size: sample_values,
//                 color: otu_ids
//             }
//         };

//         var data = [trace1];
//         var layout = {
//             x_axis: {
//                 title: "OTU ID"
//             }
//         }; 
        
//         Plotly.newPlot("bubble", data, layout);
    

//     })
// }
   
// buildPlot()



