import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'

export interface Repo {
  "repo_id": number,
  "repo_name": string
}

interface Org {
  "org_id": number,
  "org_name": string,
  "repositories": Repo[]
}

interface OrgRepoDetails {
  "enterprise": string,
  "orgs_details": Org[]
}

export interface CurrentState {
  "current_settings": {
      "count": number,
      "current_state": {
          "visibility": string,
          "allow_forking": boolean,
          "actions_perm": string,
          "access_int_repo": string
      }
  },
  "workflows_count": number,
  "violations": {
      "count": number,
      "violation_settings": {
          "visibility": string,
          "allow_forking": boolean,
          "actions_perm": string
      }
  },
  "timestamp": number,
  "secrets_count": {
      "env_secrets_count": number,
      "org_secrets_count": number,
      "repo_secrets_count": number
  }
}

interface timeHistory {
  "org_id": number,
  "repo_id": number,
  "timehistory": timeStamp[]
}

interface timeStamp {
  "time_stamp": number,
  "violationCount": number,
  "settingsCount": number
}

@Injectable({
  providedIn: 'root'
})
export class RepoFilterService {

  constructor(private http: HttpClient) {
    
  }

  getOrgs() {
    return this.http.get <OrgRepoDetails> ("http://localhost:3000/filter/orgs/repos/")
  }

  get_repo_details(orgId: any, repoId: any) {
    return this.http.get <CurrentState> (`http://localhost:3000/compliance/${orgId}/${repoId}`)
  }

  get_repo_timehistory(orgId: any, repoId: any) {
    return this.http.get <timeHistory> (`http://localhost:3000/events/${orgId}/${repoId}`)
  }
}
