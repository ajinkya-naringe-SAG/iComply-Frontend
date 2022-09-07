import { Component, OnInit } from '@angular/core';
import { Chart, registerables } from 'chart.js';
import { Repo, RepoFilterService } from '../services/repo-filter.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';

var repoCompliance_chart !: Chart
// var repoStat_chart !: Chart
var eventBar_chart !: Chart

@Component({
  selector: 'app-repo-view',
  templateUrl: './repo-view.component.html',
  styleUrls: ['./repo-view.component.css']
})
export class RepoViewComponent implements OnInit {
  orgList: any;
  selectedOrg: any = null;
  temp_selectedOrg: any = null;
  selectedOrgId: any;
  repoList: Repo[] = [];
  selectedRepo: any = null;
  temp_selectedRepo: any = null;
  selectedRepoId: any;
  timehistory_x: number[] = []
  timehistory_y: number[] = []
  myChart: any

  selectedRepo_data = {
    "visibility": "",
    "workflows": 0,
    "env_secrets": 0,
    "repo_secrets": 0,
    "org_secrets": 0,
    "total_settings": 0,
    "incomplient_settings": 0,
    "last_updated": {
      "date": "",
      "time": ""
    }
  }

  constructor(private orgsList: RepoFilterService) {
    Chart.register(...registerables);
    this.orgsList.getOrgs().subscribe(data => {
      this.orgList = data.orgs_details
    })
  }

  ngOnInit(): void {
  }

  filterForm = new FormGroup({
    orgName_field: new FormControl("", Validators.required),
    repoName_field: new FormControl({ value: "", disabled: true }, [Validators.required])
  });

  onOrgSelectionChange(value: any) {
    console.log(value);
    // this.selectedRepo = null
    // this.selectedRepoId = null
    this.filterForm.get('repoName_field')?.enable()
    for (let org of this.orgList) { // Poor coding practive. Find a way for 2 way binding
      if (org.org_name == this.temp_selectedOrg) {
        this.selectedOrgId = org.org_id
        this.repoList = org.repositories
        break
      }
    }
  }

  onRepoSelectionChange(value: any) {
    this.selectedOrg = this.temp_selectedOrg
    console.log(value);
    for (let repo of this.repoList) { // Poor coding practice
      if (repo.repo_name == this.selectedRepo) {
        this.selectedRepoId = repo.repo_id
        break
      }
    }
    console.log(`Finding data for OrgId: ${this.selectedOrgId} and RepoID: ${this.selectedRepoId}`)
    this.orgsList.get_repo_details(this.selectedOrgId, this.selectedRepoId).subscribe(data => {
      this.selectedRepo_data.visibility = data.current_settings.current_state.visibility
      this.selectedRepo_data.workflows = data.workflows_count
      this.selectedRepo_data.env_secrets = data.secrets_count.env_secrets_count
      this.selectedRepo_data.org_secrets = data.secrets_count.org_secrets_count
      this.selectedRepo_data.repo_secrets = data.secrets_count.repo_secrets_count
      this.selectedRepo_data.total_settings = data.current_settings.count
      this.selectedRepo_data.incomplient_settings = data.violations.count
      let last_ts_date = new Date(data.timestamp).toDateString()
      let last_ts_time = new Date(data.timestamp).toLocaleTimeString("en-US")
      this.selectedRepo_data.last_updated.date = last_ts_date.toString()
      this.selectedRepo_data.last_updated.time = last_ts_time.toString()
    })

    this.orgsList.get_repo_timehistory(this.selectedOrgId, this.selectedRepoId).subscribe(data => {
      console.log(data)
      let date: any
      this.timehistory_x = []
      this,this.timehistory_y = []
      for (let ts of data.timehistory) {
        date = new Date(ts.time_stamp).toLocaleTimeString("en-US")
        this.timehistory_x.push(date)
        this.timehistory_y.push(ts.violationCount)
      }
      console.log(this.timehistory_x)
      console.log(this.timehistory_y)

      if (repoCompliance_chart) {
        repoCompliance_chart.destroy();
        console.log("Line Canvas destroyed!")
        repoCompliance_chart = generateLineGraph('line', 'myChart', this.timehistory_x, 'Repo Compliance Trend', this.timehistory_y, data.timehistory[0].settingsCount)
      } else {
        repoCompliance_chart = generateLineGraph('line', 'myChart', this.timehistory_x, 'Repo Compliance Trend', this.timehistory_y, data.timehistory[0].settingsCount)
      }

      // if (repoStat_chart) {
      //   repoStat_chart.destroy();
      //   console.log("Doughnut Canvas destroyed!")
      //   console.log(`Out of compliance: ${this.selectedRepo_data.incomplient_settings}, In Compliance: ${this.selectedRepo_data.total_settings - this.selectedRepo_data.incomplient_settings}`)
      //   repoStat_chart = generateDoughGraph('doughnut', 'myStat_chart', ['In Compliance', 'Out of Compliance'], 'Pie test', [(this.selectedRepo_data.total_settings - this.selectedRepo_data.incomplient_settings), this.selectedRepo_data.incomplient_settings], ['rgba(63, 81, 181, 1)', 'rgba(121, 134, 203, 1)'], ['rgba(63, 81, 181, 0.5)', 'rgba(63, 81, 181, 0.5)'])
      // } else {
      //   repoStat_chart = generateDoughGraph('doughnut', 'myStat_chart', ['In Compliance', 'Out of Compliance'], 'Pie test', [(this.selectedRepo_data.total_settings - this.selectedRepo_data.incomplient_settings), this.selectedRepo_data.incomplient_settings], ['rgba(63, 81, 181, 1)', 'rgba(121, 134, 203, 1)'], ['rgba(63, 81, 181, 0.5)', 'rgba(63, 81, 181, 0.5)'])
      // }
      var time_markers = ["Time1", "Time2", "Time3", "Time4", "Time5", "Time1", "Time2", "Time3", "Time4", "Time5", "Time1", "Time2", "Time3", "Time4", "Time5", "Time1", "Time2", "Time3", "Time4", "Time5", "Time1", "Time2", "Time3", "Time4", "Time5", "Time1", "Time2", "Time3", "Time4", "Time5"]
      var time_data = [4, 6, 2, 7, 3, 4, 6, 2, 7, 3, 4, 6, 2, 7, 3, 4, 6, 2, 7, 3, 4, 6, 2, 7, 3, 4, 6, 2, 7, 3]
      eventBar_chart = generateBarGraph('bar', 'event_bargraph',time_markers , "Event time history", time_data)
    })
  }

  goToLink(url: string) {
    window.open(url, "_blank");
  }

}

function generateLineGraph(chartType: any, chartId: any, labels: Array<number>, label: string, data: any, settings_count: number) {
  const myChart = new Chart(chartId, {
    type: chartType,
    data: {
      labels: labels,
      datasets: [{
        label: label,
        data: data,
        backgroundColor: ['rgba(63, 81, 181, 1)', 'rgba(63, 81, 181, 1)'],
        borderColor: ['rgba(63, 81, 181, 0.5)', 'rgba(63, 81, 181, 0.5)'],
        borderWidth: 1
      }]
    },
    options: {
      scales: {
        y: {
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
          max: settings_count
        }
      },
      responsive: true,
      plugins: {
          legend: {
          display: false
        }
      },
      maintainAspectRatio: false
    }
  });
  return myChart
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
      maintainAspectRatio: false
    }
  });
  return myChart
}

function generateBarGraph(chartType: any, chartId: any, labels: Array<string>, label: string, data: any) {
  const myChart = new Chart(chartId, {
    type: chartType,
    data: {
      labels: labels,
      datasets: [{
        label: label,
        data: data,
        backgroundColor: ['rgba(63, 81, 181, 0.7)', 'rgba(63, 81, 181, 0.7)'],
        borderColor: ['rgba(63, 81, 181, 1)', 'rgba(63, 81, 181, 1)'],
        borderWidth: 1
      }]
    },
    options: {
      scales: {
        y: {
          beginAtZero: true,
        },
        x: [{
          ticks: {
            max: 4,
          }
        }]
      },
      responsive: true,
      plugins: {
          legend: {
          display: false
        }
      },
      maintainAspectRatio: false
    }
  });
  return myChart
}