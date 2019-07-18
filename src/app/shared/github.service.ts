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
        console.log(response);
        return response;
      }));
  }

  getUser(): any {
    return this.http.get<any>(`https://api.github.com/users/AdrianSalvador21?client_id=${this.clientId}&client_secret=${this.clientSecret}&sort=${this.reposSort}`)
      .pipe(
      map((response) => {
        console.log(response);
        return response;
      }));
  }

  getRepositories(page): any {
    return this.http.get<any>(`https://api.github.com/users/AdrianSalvador21/repos?client_id=${this.clientId}&client_secret=${this.clientSecret}&page=${page}&visibility=all`)
      .pipe(
        map((response) => {
          console.log(response);
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
          console.log(response);
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


}
