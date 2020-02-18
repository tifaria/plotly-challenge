
  
// function getData() {
//     d3.json("data/samples.json").then(function(data) {

//         console.log(data);
//     });
// };

// getData()


function buildPlot() {
    d3.json("data/samples.json").then(function(data) {
        // console.log(data);
        var sample_values = data.sample_values;
        var otu_ids = data.otu_ids;
        var otu_labels = data.otu_labels;

        var trace1 = {
            x: otu_ids,
            y: sample_values,
            text: otu_labels,
            type: "bubble",
            mode: "markers",
            marker: {
                size: sample_values,
                color: otu_ids
            }
        };

        var data = [trace1];
        var layout = {
            x_axis: {
                title: "OTU ID"
            }
        }; 
        
        Plotly.newPlot("bubble", data, layout);
    

    })
}
   
buildPlot();



