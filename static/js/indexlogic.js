// JS code for the plots on the home page

/////////// Functions /////////////
// Creates a color gradient function based on a max and min value
function getColorGradientGenerator(min, max) {
    // Based on the min and max put in, create a color gradient generator function
    const generator = d3.scaleLinear().domain([min, max]).range(["#EDAE49", "#61210F"]);
    // You can put a number into this function and it will spit out a color on the gradient
    return generator;
};

// Generates a scatter chart that shows cost by wears per month
function generateCostByWearsChart(itemsData) {
    // Parse the items data - pull out cost, wears per month and cost per wear
    // Store each in an array (this is how Plotly wants the data)
    const itemsCost = itemsData.map(item => item.cost);
    const itemsWearsPerMonth = itemsData.map(item => item.wears_per_month);
    const itemsCostPerWear = itemsData.map(item => item.cost_per_wear);

    // Create a color gradient generator based on the max and min cost per wear
    const colorGenerator = getColorGradientGenerator(Math.min(...itemsCostPerWear), Math.max(...itemsCostPerWear));
    // Use the color generator to get a color for each item based on cost per wear
    // Store these colors in an array
    const costPerWearColors = itemsCostPerWear.map(item => colorGenerator(item));

    // Create the data trace for the plot
    const data = [
        {
            x: itemsCost,
            y: itemsWearsPerMonth,
            mode: "markers",
            marker: {
                color: costPerWearColors
            },
            type: "scatter",
        }
    ];

    // Set layout parameters
    const layout = {
        xaxis: {
            title: "Cost of Item",
        },
        yaxis: {
            title: "Wears per Month",
        },
    };

    // Generate plot
    Plotly.newPlot("costByWears", data, layout);
};

// Generates a bar chart of how many items there are of each source type
function generateItemsBySource(itemsData) {
    // Parse the data
    // Pull out the sources and put them in a list
    const sources = itemsData.map(item => item.source);
    // Generate an empty dictionary to store each source and the total number of items
    const uniqueSourceCount = {};
    sources.forEach(source => {
        // If the source is already in the dictionary, add 1 to the count
        if (uniqueSourceCount.hasOwnProperty(source)) {
            uniqueSourceCount[source] += 1;
        } else {
            // If the source is not in the dictionary, add it and set the count to 1
            uniqueSourceCount[source] = 1;
        }
    });

    // Create the data trace for the plot
    const data = [
        {
            x: Object.keys(uniqueSourceCount),
            y: Object.values(uniqueSourceCount),
            marker: {
                color: ["#61210F", "#EA2B1F", "#EDAE49", "#F9DF74", "#F9EDCC"]
            },
            type: "bar",
            }
        ];

    // Set layout parameters
    const layout = {
        xaxis: {
            title: "Source",
        },
        yaxis: {
            title: "Total Number of Items",
        },
    };

    // Generate plot
    Plotly.newPlot("itemsBySource", data, layout);
};

/////////// API Calls (and actually running the code) /////////////
// Use d3 to call your API route that returns data and then initialize your plots
d3.json("api/items").then((itemsData) => {
    // Calls the functions above to generate the plots
    generateCostByWearsChart(itemsData);
    generateItemsBySource(itemsData);
});
