import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MainService } from '../services/main.service';
import { TopicService } from '../services/topic.service';
import { HttpClient } from '@angular/common/http';
@Component({
  selector: 'app-upload',
  templateUrl: './upload.component.html',
  styleUrls: ['./upload.component.css']
})
export class UploadComponent {

  contentTypes: string[] = ['.pdf', '.mp3', '.mp4'];
  programCourses: string[] = ['Course 1', 'Course 2', 'Course 3'];
  branches: string[] = ['Branch 1', 'Branch 2', 'Branch 3'];
  semesters: string[] = ['Semester 1', 'Semester 2', 'Semester 3'];
  subjects: any;
  topics: any
  constructor(private http: HttpClient, private formBuilder: FormBuilder, private mainService: MainService, private topicService: TopicService) { }


  formData = {
    programCourse: '',
    branch: '',
    semester: '',
    subjectTitle: '',
    subject: '',
    topic: '',
    title: '',
    contentType: '',
    allowDownload: "No",
  }
  ngOnInit() {

    this.getAllSubjects();

  }
  getAllSubjects() {
    this.mainService.getSubjects().subscribe((result) => {
      this.subjects = result;
      console.log(result)
    })
  }

  getDataByTopics(id: any) {
    console.log("id", id);
    this.topicService.getTopics(id).subscribe((result) => {
      this.topics = result;
      console.log(result);
    })
  }
  selectedFile: File | null = null;

  onFileSelected(event: any) {
    this.selectedFile = event.target.files[0];
  }

  submit() {

    this.arrangeData();
    const formData = new FormData();
    if (this.selectedFile) {
      
      formData.append('file', this.selectedFile);
      formData.append('dataItemName', this.formData.title);
      formData.append('dataType', this.formData.contentType);
      formData.append('program', this.formData.programCourse);
      formData.append('branch', this.formData.branch);
      formData.append('semester', this.formData.semester);
      formData.append('subject', this.formData.subjectTitle);
      formData.append('allowDownload', this.formData.allowDownload );
      formData.append('topicId', this.formData.topic.toString());}
    this.mainService.saveAll(formData).subscribe(
      (response) => {
        console.log('Upload successful:', response);
        this.refreshPage();
      },
      (error) => {
        this.refreshPage();

      }
    );
  }
  updateAllowDownload(checked: boolean) {
    this.formData.allowDownload = checked ? 'Yes' : 'No';
  }
  refreshPage() {
    window.location.href = window.location.href;
  }

  arrangeData() {
    let sub;
    for (let i = 0; i < this.subjects.length; i++) {
      if (this.subjects[i].subjectId == this.formData.subject) {
        sub = this.subjects[i].subjectTitle;
        break;
      }
    }

    this.formData.subjectTitle = sub;
   
  }
}

