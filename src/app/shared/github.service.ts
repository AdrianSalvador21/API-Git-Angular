import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {map} from 'rxjs/operators';
import {Observable} from 'rxjs';

@Injectable({providedIn: 'root'})
export class GithubService {

  clientId = '526dd6be9b95e75a781f';
  clientSecret = 'c991aa4dcdf7ba8c1ac8cc95178cb7a77ac4a45e';
  accessToken = '6d61c09af2c57550cc49d5';
  accessTokenTwo = '7d733806076eafea9c';
  reposSort = 'created: asc';

  constructor(private http: HttpClient) {
  }

  getInitial(): any {
    return this.http.get<any>('https://api.github.com').pipe(
      map((response) => {
        return response;
      }));
  }

  getUser(): any {
    return this.http.get<any>(`https://api.github.com/users/AdrianSalvador21?client_id=${this.clientId}&client_secret=${this.clientSecret}&sort=${this.reposSort}`)
      .pipe(
        map((response) => {
          return response;
        }));
  }

  getRepositories(page): any {
    return this.http.get<any>(`https://api.github.com/users/AdrianSalvador21/repos?client_id=${this.clientId}&client_secret=${this.clientSecret}&page=${page}&visibility=all`)
      .pipe(
        map((response) => {
          return response;
        }));
  }

  getProjects(): any {
    return this.http.get<any>(`https://api.github.com/users/AdrianSalvador21/projects?client_id=${this.clientId}&client_secret=${this.clientSecret}`, {
      headers: {
        'Accept': 'application/vnd.github.inertia-preview+json'
      }
    })
      .pipe(
        map((response) => {
          return response;
        }));
  }

  createRepository(data): any {
    return this.http.post<any>(`https://api.github.com/user/repos?access_token=${this.accessToken + this.accessTokenTwo}`,
      {
        name: !!data.name ? data.name : '',
        description: !!data.description ? data.description : '',
        homepage: 'https://github.com',
        private: data.private,
        has_issues: true,
        has_wiki: true
      }
    ).pipe(
      map((response) => {
        return response;
      }));
  }

  updateProject(data, projectID): any {
    return this.http.patch<any>(`https://api.github.com/projects/${projectID}?client_id=${this.clientId}&client_secret=${this.clientSecret}&access_token=${this.accessToken + this.accessTokenTwo}`,
      {
        name: data.name,
        body: data.description,
        state: data.state,
        private: false
      }, {
        headers: {
          'Accept': 'application/vnd.github.inertia-preview+json'
        }
      }
    ).pipe(
      map((response) => {
        return response;
      }));
  }

  deleteProject(projectID): any {
    return this.http.delete<any>(`https://api.github.com/projects/${projectID}?access_token=${this.accessToken + this.accessTokenTwo}`,
      {
        headers: {
          'Accept': 'application/vnd.github.inertia-preview+json'
        }
      }
    ).pipe(
      map((response) => {
        return response;
      }));
  }

  createProject(data): any {
    return this.http.post<any>(`https://api.github.com/user/projects?access_token=${this.accessToken + this.accessTokenTwo}`,
      {
        name: !!data.name ? data.name : '',
        body: !!data.body ? data.body : ''
      },
      {
        headers: {
          'Accept': 'application/vnd.github.inertia-preview+json'
        }
      }
    ).pipe(
      map((response) => {
        return response;
      }));
  }

  getFollowingUser(): any {
    return this.http.get<any>(`https://api.github.com/user/following?client_id=${this.clientId}&client_secret=${this.clientSecret}&access_token=${this.accessToken + this.accessTokenTwo}`)
      .pipe(
        map((response) => {
          return response;
        }));
  }

  searchUser(value): any {
    return this.http.get<any>(`https://api.github.com/search/users?client_id=${this.clientId}&client_secret=${this.clientSecret}&q=${value}`)
      .pipe(
        map((response) => {
          return response;
        }));
  }

  unfollowUser(username): any {
    console.log(username);
    return this.http.delete<any>(`https://api.github.com/user/following/${username}?access_token=${this.accessToken + this.accessTokenTwo}`,
      {
        headers: {
          'Accept': 'application/vnd.github.inertia-preview+json'
        }
      }
    ).pipe(
      map((response) => {
        console.log(username);
        console.log(response);
        return response;
      }));
  }

  followUser(username): any {
    return this.http.put<any>(`https://api.github.com/user/following/${username}?access_token=${this.accessToken + this.accessTokenTwo}`,
      {
        headers: {
          'Content-Length': '0'
        }
      }
    ).pipe(
      map((response) => {
        return response;
      }));
  }

  followersUser(): any {
    return this.http.get<any>(`https://api.github.com/user/followers?client_id=${this.clientId}&client_secret=${this.clientSecret}&access_token=${this.accessToken + this.accessTokenTwo}`)
      .pipe(
        map((response) => {
          return response;
        }));
  }


}
