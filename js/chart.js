
// Initialize Chart.js
var ctxVoter = document.getElementById('voterChart').getContext('2d');
var voterChart = new Chart(ctxVoter, {
  type: 'pie',
  data: {
    labels: ['Democarts', 'Republicans'],
    datasets: [{
      data: [60, 40], // Example data
      backgroundColor: ['#1E3A8A', '#EF4444'],
    }]
  },
});

var ctxElectoral = document.getElementById('electoralChart').getContext('2d');
var electoralChart = new Chart(ctxElectoral, {
  type: 'bar',
  data: {
            labels: ["18-21", "22-30", "31-35", "36-45", "46-60", "61-80", "80-10  0"],
            datasets: [{
                label: "Democrats",
                data: [65, 59, 80, 81, 56, 55, 40],
                backgroundColor: '#1E3A8A'
            }, {
                    label: "Republicans",
                    data: [28, 48, 40, 19, 86, 27, 90],
                    backgroundColor: '#EF4444'
                }]
        },
});

var ctxTimeLine = document.getElementById('trendsChart').getContext('2d');
var ctxTimeLine = new Chart(ctxTimeLine, {
  type: 'line',
        data: {
            labels: ["January", "February", "March", "April", "May", "June", "July"],
            datasets: [{
                label: "Democrats Voters",
                data: [65, 59, 80, 81, 56, 55, 40],
                borderColor: 'rgba(0, 188, 212, 0.75)',
                backgroundColor: '#1E3A8A',
                pointBorderColor: 'rgba(0, 188, 212, 0)',
                pointBackgroundColor: 'rgba(0, 188, 212, 0.9)',
                pointBorderWidth: 1
            }, {
                    label: "Republican Voters",
                    data: [28, 48, 40, 19, 86, 27, 90],
                    borderColor: 'rgba(233, 30, 99, 0.75)',
                    backgroundColor: '#EF4444',
                    pointBorderColor: 'rgba(233, 30, 99, 0)',
                    pointBackgroundColor: 'rgba(233, 30, 99, 0.9)',
                    pointBorderWidth: 1
                }]
        },
});


// Data of participation per gender
const data2024 = {
labels: ['Men', 'Women'],
datasets: [{
  data: [40, 60], // Exemple: 40% hommes, 60% femmes
  backgroundColor: ['#1E3A8A', '#F472B6'], // Bleu pour hommes, rose pour femmes
  hoverOffset: 4
}]
};

const data2020 = {
labels: ['Men', 'Women'],
datasets: [{
  data: [45, 55],
  backgroundColor: ['#1E3A8A', '#F472B6'],
  hoverOffset: 4
}]
};

const data2016 = {
labels: ['Men', 'Women'],
datasets: [{
  data: [50, 50],
  backgroundColor: ['#1E3A8A', '#F472B6'],
  hoverOffset: 4
}]
};

const dataCandidat = {
labels: ['Donald Trump', 'Kamala Harris', 'Ron de Santis', 'Others'],
datasets: [{
  data: [38, 26, 22, 14 ],
  backgroundColor: ['#EF4444', '#1E3A8A','#e6e217','#3af50b'],
  hoverOffset: 4
}]
};

// Options of graphics
const options = {
responsive: true,
maintainAspectRatio: false,
plugins: {
  legend: {
    display: false // Cacher la légende pour un style minimaliste
  }
},
cutout: '70%', // Définit la taille du trou central du donut
};

// Initialize donuts graphs
new Chart(document.getElementById('chart2024'), {
type: 'doughnut',
data: data2024,
options: options
});

new Chart(document.getElementById('chart2020'), {
type: 'doughnut',
data: data2020,
options: options
});

new Chart(document.getElementById('chart2016'), {
type: 'doughnut',
data: data2016,
options: options
});

new Chart(document.getElementById('chartCandidat'), {
type: 'doughnut',
data: dataCandidat,
options: options
});
     