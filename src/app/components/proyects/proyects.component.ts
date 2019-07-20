import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {GithubService} from '../../shared/github.service';
import {FormBuilder, NgForm, Validators} from '@angular/forms';

@Component({
  selector: 'app-proyects',
  templateUrl: './proyects.component.html',
  styleUrls: ['./proyects.component.css']
})
export class ProyectsComponent implements OnInit {
  @ViewChild('childModal') public childModal: ElementRef;
  updateSuccess = false;
  updateError = false;
  projects: any;

  filterForm = this.fb.group({
    name: ['', [Validators.required]],
    body: ['']
  });

  constructor(private githubService: GithubService, public fb: FormBuilder) {
    this.githubService.getProjects().subscribe(projectsResponse => {
      this.projects = projectsResponse;
      this.projects.forEach(project => {
        project.updating = false;
      });
    });
  }

  ngOnInit() {
  }

  updateProject(form: NgForm, index, id) {
    this.updateSuccess = false;
    this.updateError = false;
    this.projects[index].updating = true;
    this.githubService.updateProject(form.value, id).subscribe(updateResponse => {
      this.updateSuccess = true;
      setTimeout(() => {
        this.updateSuccess = false;
      }, 3000);
      this.projects[index].updating = false;
      this.projects[index].name = updateResponse.name;
      this.projects[index].body = updateResponse.body;
      this.projects[index].state = updateResponse.state;
    }, updateError => {
      console.error(updateError);
      this.updateError = true;
      setTimeout(() => {
        this.updateError = false;
      }, 3000);
    });
  }

  deleteProject(index, id) {
    this.githubService.deleteProject(id).subscribe(() => {
      this.projects.splice(index, 1);
    });
  }


  createProject() {
    this.githubService.createProject(this.filterForm.getRawValue()).subscribe(createResponse => {
      this.projects.push(createResponse);
      this.githubService.updateProject(createResponse, createResponse.id).subscribe(updateResponse => {
        this.childModal.nativeElement.click();
      });

    });
  }

}
