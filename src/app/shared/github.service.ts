import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {map} from 'rxjs/operators';
import {Observable} from 'rxjs';

@Injectable({providedIn: 'root'})
export class GithubService {

  clientId = '526dd6be9b95e75a781f';
  clientSecret = 'c991aa4dcdf7ba8c1ac8cc95178cb7a77ac4a45e';
  accessToken = 'c3213a5de8149844ba4bca621da23e0d273dbd78';
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

  getRepositories(): any {
    return this.http.get<any>(`https://api.github.com/users/AdrianSalvador21/repos?client_id=${this.clientId}&client_secret=${this.clientSecret}`)
      .pipe(
        map((response) => {
          console.log(response);
          return response;
        }));
  }

  createRepository(data): any {
    return this.http.post<any>(`https://api.github.com/user/repos?access_token=${this.accessToken}`,
      {
        name: data.name,
        description: data.description,
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
