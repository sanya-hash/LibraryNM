import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { MainService } from '../services/main.service';
import { TopicService } from '../services/topic.service';
import { DataService } from '../services/data.service';
import { ViewChild, ElementRef } from '@angular/core';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent {
  // @ViewChild(PdfViewerComponent, { static: false }) pdfComponent: PdfViewerComponent;
  // @ViewChild('pdfContainer', { static: false }) pdfContainer: ElementRef | undefined;
  constructor(private m: MainService, private t: TopicService, private d: DataService, private sanitizer: DomSanitizer,private cdr:ChangeDetectorRef
) { }
  subjects:any
  topics:any[]= []
  isData:boolean = false
  isDataItem:boolean = false
  filepath:any
  dataItems:any[] = []
  videoUrl:any = '';
  pdfUrl: SafeUrl = '';
  audioUrl: SafeUrl = '';
  dataItemAndType:any



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

  // viewData(dataItem: any): void {
  //   // Assuming dataItem contains the file path
  //   this.filepath= dataItem.filePath; // Adjust the property name accordingly
  //   console.log(this.filepath)
  // }
  viewData(dataItemId: any, fileType: any): void {
    this.videoUrl = '';
    this.pdfUrl ='';
    this.m.getFileData(dataItemId).subscribe(
      (response: ArrayBuffer) => {
        // const blobType = fileType === '.pdf' ? 'application/pdf' : 'video/mp4';
        const blobType = fileType === '.pdf' ? 'application/pdf' : fileType === '.mp3' ? 'audio/mp3' : 'video/mp4';
        const blob = new Blob([response], { type: blobType });

        switch (fileType) {
          case '.pdf':
            this.pdfUrl = this.sanitizer.bypassSecurityTrustResourceUrl(URL.createObjectURL(blob));
            console.log('pdfUrl:', this.pdfUrl);
            break;
          case '.mp3':
            this.audioUrl = this.sanitizer.bypassSecurityTrustUrl(URL.createObjectURL(blob));
            console.log('audioUrl', this.audioUrl);
            break;
          case '.mp4':
            this.videoUrl = this.sanitizer.bypassSecurityTrustUrl(URL.createObjectURL(blob));
            this.cdr.detectChanges();
            console.log('videoUrl:', this.videoUrl);
            break;
        }
      },
      (error) => {
        console.error('Error fetching file data:', error);
      }
    );
  }

}
