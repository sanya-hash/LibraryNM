# Library

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 16.0.1.

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The application will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via a platform of your choice. To use this command, you need to first add a package that implements end-to-end testing capabilities.

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI Overview and Command Reference](https://angular.io/cli) page.




package com.jilit.unity.controller;

import java.io.IOException;
import java.nio.file.Files;
//
//import javax.annotation.Resource;
import java.nio.file.Path;
import java.nio.file.Paths;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.util.UriComponentsBuilder;
import org.springframework.core.io.PathResource;
import org.springframework.core.io.Resource;
import org.springframework.core.io.UrlResource;

@RestController
@CrossOrigin(origins = "*")
@RequestMapping("/api/videos")
public class VideoController {
	
	String videoStoragepath="\\\\172.16.9.55\\shared-folder\\";
	
	@GetMapping("/{videoName}")
    public ResponseEntity<byte[]> streamVideo(@PathVariable String videoName) throws IOException {
        String videoPath = videoStoragepath + videoName;

        Path path = Paths.get(videoPath);

        if (Files.exists(path) && Files.isReadable(path)) {
            byte[] videoBytes = Files.readAllBytes(path);

            HttpHeaders headers = new HttpHeaders();
            headers.setContentType(MediaType.APPLICATION_OCTET_STREAM);
            headers.setContentLength(videoBytes.length);
            headers.setContentDispositionFormData("attachment", videoName);

            return ResponseEntity.ok()
                    .headers(headers)
                    .body(videoBytes);
        } else {
            return ResponseEntity.notFound().build();
        }
    }			

//    @GetMapping("/{videoName}")
//    public ResponseEntity<Resource> streamVideo(@PathVariable String videoName) throws IOException {
//        String videoPath = videoStoragepath + videoName;
//
//        Resource videoResource = new UrlResource(videoPath);
//
//        if (videoResource.exists() && videoResource.isReadable()) {
//            HttpHeaders headers = new HttpHeaders();
//            headers.add(HttpHeaders.CONTENT_TYPE, "video/mp4");
//
//            return ResponseEntity.ok()
//                    .headers(headers)
//                    .body(videoResource);
//        } else {
//            return ResponseEntity.notFound().build();
//        }
//    }
	
	
	
	
//	@GetMapping("/{videoName}")
//    public ResponseEntity<Resource> streamVideo(@PathVariable String videoName) throws IOException {
//        String videoPath = videoStoragepath + videoName;
//
//        Resource videoResource = new UrlResource(videoPath);
//
//        if (videoResource.exists() && videoResource.isReadable()) {
//            return ResponseEntity.ok().body(videoResource);
//        } else {
//            return ResponseEntity.notFound().build();
//        }
//    }
	

}

<!-- <video width="640" height="360" controls>
  <source [src]="videoUrl" type="video/mp4">
  Your browser does not support the video tag.
</video> -->

<!-- video.component.html -->
<video width="640" height="360" controls [src]="videoUrl">
  Your browser does not support the video tag.
</video>

import { Component, OnInit } from '@angular/core';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import {VideoService} from '../video.service'

@Component({
  selector: 'app-video',
  templateUrl: './video.component.html',
  styleUrls: ['./video.component.css']
})
export class VideoComponent implements OnInit {
 videoUrl: SafeResourceUrl;

  constructor(private sanitizer: DomSanitizer, private videoService: VideoService) { }

  ngOnInit(): void {
    const videoName = 'test.mp4';  // Provide the desired video file name
    this.loadVideo(videoName);
  }

  
  loadVideo(videoName: any): void {
    this.videoService.getVideoUrl(videoName).subscribe(
      response => {
        const blob = new Blob([response], { type: 'video/mp4' });
        const url = URL.createObjectURL(blob);
        this.videoUrl = this.sanitizer.bypassSecurityTrustUrl(url);
        console.log('Video URL:', this.videoUrl);
      },
      error => {
        console.error('Error loading video:', error);
      }
    );
  }
 
}
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { HttpParams } from '@angular/common/http';
@Injectable({
  providedIn: 'root'
})
export class VideoService {
  private baseUrl = 'http://localhost:8080/api/videos/';

  constructor(private http: HttpClient) { }

  getVideoUrl(videoName: any): Observable<ArrayBuffer>{
    const url = `${this.baseUrl}${videoName}`;
    return this.http.get(url, { responseType: 'arraybuffer' });
  }
  // getVideoUrl(videoName: string): Observable<Blob> {
  //   const url = `${this.baseUrl}${videoName}`;
  //   return this.http.get(url, { responseType: 'blob' });
  // }
}
