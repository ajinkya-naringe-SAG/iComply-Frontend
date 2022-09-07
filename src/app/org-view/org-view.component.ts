import { Component, OnInit } from '@angular/core';
import {Chart, registerables} from 'chart.js'

@Component({
  selector: 'app-org-view',
  templateUrl: './org-view.component.html',
  styleUrls: ['./org-view.component.css']
})
export class OrgViewComponent implements OnInit {
  public doughnutChartLabels = ['01/07', '02/07', '03/07', '04/07', '05/07', '06/07', '07/07', '08/07', '09/07', '10/07', '11/07', '12/07', '13/07', '14/07', '15/07'];
  public doughnutChartData = [2, 1, 3, 5, 2, 5, 4, 5, 1, 2, 3, 2, 4, 5, 3];
  public orgRepoChartData = [14, 15, 11, 8, 10, 15, 13, 11, 6, 8, 14, 16, 15, 15, 12];
  public doughnutChartType = 'doughnut';

  constructor() {
    Chart.register(...registerables);
  }

  ngOnInit(): void {
    this.generateGraph('line', 'org_comp_stats', this.doughnutChartLabels, 'Org Compliance Trend', this.doughnutChartData, ['rgba(63, 81, 181, 1)', 'rgba(63, 81, 181, 1)'], ['rgba(63, 81, 181, 0.5)', 'rgba(63, 81, 181, 0.5)'], true)
    this.generateGraph('line', 'org_repo_stats', this.doughnutChartLabels, 'Repo Compliance Trend', this.orgRepoChartData, ['rgba(63, 81, 181, 1)', 'rgba(63, 81, 181, 1)'], ['rgba(63, 81, 181, 0.5)', 'rgba(63, 81, 181, 0.5)'], true)
    generateDoughGraph('doughnut', 'org-pie-chart-1', ['In Compliance', 'Out of Compliance'], 'Pie test', [3, 2], ['rgba(63, 81, 181, 1)', 'rgba(121, 134, 203, 1)'], ['rgba(63, 81, 181, 0.5)', 'rgba(63, 81, 181, 0.5)'])
    generateDoughGraph('doughnut', 'org-pie-chart-2', ['In Compliance', 'Out of Compliance'], 'Pie test', [12, 4], ['rgba(63, 81, 181, 1)', 'rgba(121, 134, 203, 1)'], ['rgba(63, 81, 181, 0.5)', 'rgba(63, 81, 181, 0.5)'])
  }

  generateGraph(chartType: any, chartId: any, labels: Array<string>, label: string, data: any, bgColor: any, borColor: any, showAxis: boolean) {
    const myChart = new Chart(chartId, {
      type: chartType,
      data: {
        labels: labels,
        datasets: [{
          label: label,
          data: data,
          backgroundColor: bgColor,
          borderColor: borColor,
          borderWidth: 1
        }]
      },
      options: {
        scales: {
          y: {
            display: showAxis,
            beginAtZero: true,
            precision: 0,
            ticks: {
              // Include a dollar sign in the ticks
              callback: function (value: any, index: any, ticks: any) {
                if (Math.floor(value) === value) {
                  return value;
                }
              }
            }
          },
          x: {
            display: showAxis
          }
        },
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: {
            display: false
          }
        }
      }
    });
  }
}

function generateDoughGraph(chartType: any, chartId: any, labels: Array<string>, label: string, data: any, bgColor: any, borColor: any) {
  const myChart = new Chart(chartId, {
    type: chartType,
    data: {
      labels: labels,
      datasets: [{
        label: label,
        data: data,
        backgroundColor: bgColor,
        borderColor: borColor,
        borderWidth: 1
      }]
    },
    options: {
      scales: {
        y: {
          display: false,
          beginAtZero: true,
          precision: 0,
          ticks: {
            // Include a dollar sign in the ticks
            callback: function (value: any, index: any, ticks: any) {
              if (Math.floor(value) === value) {
                return value;
              }
            },
          },
        },
        x: {
          display: false
        }
      },
      responsive: true,
      plugins: {
          legend: {
          display: false
        }
      },
      maintainAspectRatio: false,
      cutout: 45
    }
  });
  return myChart
}