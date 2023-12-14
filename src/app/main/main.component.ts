import { Component, OnInit } from '@angular/core';
import { MainService } from '../services/main.service';
import { TopicService } from '../services/topic.service';
import { DataService } from '../services/data.service';
import { ViewChild, ElementRef } from '@angular/core';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent {
  // @ViewChild(PdfViewerComponent, { static: false }) pdfComponent: PdfViewerComponent;
  // @ViewChild('pdfContainer', { static: false }) pdfContainer: ElementRef | undefined;
  constructor(private m: MainService,private t:TopicService, private d:DataService) { }
  subjects:any
  topics:any[]= []
  isData:boolean = false
  isDataItem:boolean = false
  filepath:any
  dataItems:any[] = []
  ngOnInit(): void {
    this.m.getSubjects().subscribe((data) =>{
      this.subjects = data
        //console.log(this.subjects)
    }
       
       );
  }
 

  selectedSubjects: number[] = [];

  toggleSubjectSelection(subjectId: number): void {
    const index = this.selectedSubjects.indexOf(subjectId);
    if (index === -1) {
      this.selectedSubjects.push(subjectId);
    } else {
      this.selectedSubjects.splice(index, 1);
    }
    this.topics = [];
    for (let i = 0; i < this.selectedSubjects.length; i++) {
      this.t.getTopics(this.selectedSubjects[i]).subscribe((result) => {
        this.topics.push(result);
        this.isData = true;
      })
    }
  }

  selectedTopics: number[] = [];

  toggleTopicSelection(topicId: number): void {
    const index = this.selectedTopics.indexOf(topicId);
    if (index === -1) {
      this.selectedTopics.push(topicId);
    } else {
      this.selectedTopics.splice(index, 1);
    }
    this.dataItems = []
    for (let i = 0; i < this.selectedTopics.length; i++) {
      this.d.getDataByTopic(this.selectedTopics[i]).subscribe((result) => {
        this.dataItems.push(result);
        //console.log(this.dataItems)
      })
      this.isDataItem = true;
    }
  }

  getSubjectData(): void {
    //console.log('Selected Subject IDs:', this.selectedSubjects);
    this.topics = [];
    for(let i=0;i<this.selectedSubjects.length;i++){
      this.t.getTopics(this.selectedSubjects[i]).subscribe((result) => {
        this.topics.push(result);
        this.isData=true;
      })
    }
    
  }
  getTopicsData():void {
    this.dataItems = []
    for (let i = 0; i < this.selectedTopics.length; i++) {
      this.d.getDataByTopic(this.selectedTopics[i]).subscribe((result)=>{
        this.dataItems.push(result);
        console.log(this.dataItems);
      })
      this.isDataItem = true;
    }
  }
  moveDown(dataItem: any): void {
    // Implement the logic for moving the data item down
    console.log('Move Down:', dataItem);
  }

  viewData(dataItem: any): void {
    // Assuming dataItem contains the file path
    this.filepath= dataItem.filePath; // Adjust the property name accordingly
    console.log(this.filepath)
  }

}
