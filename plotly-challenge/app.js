const url = "samples.json";

// Fetch the JSON data 
d3.json(url).then(function(data) {
  console.log(data); //for trouble shooting
});

dropdown()

function dropdown(){
  const url = "samples.json";

  d3.json(url).then((data)=>{
      nd = data.names.slice(0,20);
      metadata=data.metadata
      console.log(nd); //for trouble shooting
      var dd = d3.select("#selDataset");
      nd.forEach((sample) => {
        dd.append("option")
        .text(sample)
        .property("value");
      });

  let firstrecord= nd[0];
   table(firstrecord)
   charts(firstrecord)
  });

}

//   function table(new_data);

function optionChanged(update_data){
  table(update_data)
  charts(update_data)
}

function table(test){
  const url = "samples.json";
  d3.json(url).then((data)=> {
    samples = data.metadata;
    fd = samples.filter(test1=>test1.id==test);
    dd1=fd[0];
    
    let table = d3.select("#sample-metadata");
    let tbody = table.select("tbody");

    table.html("");
    
    Object.entries(dd1).forEach(([key, value]) => {
      let cell = table.append("tr");
      cell.append("td").html(`${key}: `);
      cell.append("td").html(`${value}`);
  
    });

  });
         
}  

// dropdown()

function charts(test){
  d3.json(url).then((data)=> {
    let samples1 = data.samples;
    let fd1 = samples1.filter(test1=>test1.id==test);
    let dd2=fd1[0];
    console.log(dd2);

    let svalue = dd2.sample_values;
    let oid = dd2.otu_ids;
    let otlabels = dd2.otu_labels;

    let trace1 = {
          x: svalue.slice(0,10).reverse(),
          y: oid.slice(0,10).map(x =>`OTUID ${x}`).reverse(),         
          text: otlabels.slice(0,10).reverse(),
          type: "bar",
          orientation: "h"
        };
    var data = [trace1];
    var barLayout= {title: "Top 10 bacteria found in Belly Button"};
    Plotly.newPlot("bar", data, barLayout);

    let trace2={
      y: svalue,
      x: oid,
      text: otlabels,
      mode:'markers',
      marker:{color:oid, size: svalue}

    };

    let bublayout1 = {
      title: "OTU Occurance",
      showlegend: false,
      // height: 600,
      // width: 1200
    };

    data1=[trace2];
    Plotly.newPlot("bubble", data1, bublayout1);

  });
}