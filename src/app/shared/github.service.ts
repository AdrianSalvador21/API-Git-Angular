import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {map} from 'rxjs/operators';
import {Observable} from 'rxjs';

@Injectable({providedIn: 'root'})
export class GithubService {

  clientId = '526dd6be9b95e75a781f';
  clientSecret = 'c991aa4dcdf7ba8c1ac8cc95178cb7a77ac4a45e';
  accessToken = '2646b1ad0efc0a84aded994f983232b46d97c720';
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
    return this.http.get<any>(`http://api.github.com/users/AdrianSalvador21?client_id=${this.clientId}&client_secret=${this.clientSecret}&sort=${this.reposSort}`)
      .pipe(
      map((response) => {
        console.log(response);
        return response;
      }));
  }

  getRepositories(): any {
    return this.http.get<any>(`http://api.github.com/users/AdrianSalvador21/repos?client_id=${this.clientId}&client_secret=${this.clientSecret}`)
      .pipe(
        map((response) => {
          console.log(response);
          return response;
        }));
  }

  createRepository(): any {
    return this.http.post<any>(`https://api.github.com/user/repos?access_token=${this.accessToken}`,
      {
        name: 'Example Repository 3',
        description: 'This is your first repository',
        homepage: 'https://github.com',
        private: false,
        has_issues: true,
        has_wiki: true
      }
    ).pipe(
      map((response) => {
        return response;
      }));
  }


}
