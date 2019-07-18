import { Component, OnInit } from '@angular/core';
import {GithubService} from '../../shared/github.service';

@Component({
  selector: 'app-proyects',
  templateUrl: './proyects.component.html',
  styleUrls: ['./proyects.component.css']
})
export class ProyectsComponent implements OnInit {

  projects: any;

  constructor(private githubService: GithubService) {
    this.githubService.getProjects().subscribe(projectsResponse => {
      console.log(projectsResponse);
      this.projects = projectsResponse;
    });
  }

  ngOnInit() {
  }

}
