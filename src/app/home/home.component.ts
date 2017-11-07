import { Component,OnInit,ViewChildren } from '@angular/core';
import { Http, Headers,Response } from '@angular/http';
import { Ng4FilesModule,Ng4FilesStatus,Ng4FilesSelected } from 'angular4-files-upload';
import * as Promise from 'bluebird';
//import {TweenMax, TimelineLite} from '@types/gsap';
//import TweenMax from '@types/gsap/src/uncompressed/TweenMax';
import TimelineLite from 'gsap/TimelineLite';
import TimelineMax from 'gsap/TimelineMax';
//import TweenLite from 'gasp/TweenLite';
//import TweenMax from '@types/gsap/Tween';


@Component({
	selector: 'app-home',
	templateUrl: './home.component.html',
	styleUrls: ['./home.component.scss']
})

export class HomeComponent implements OnInit {

	public selectedFiles;
	public files = [];
	private message = [];
	private headers  = new Headers({"Content-Type":"multipart/form-data",
									"cache-control": "no-cache"});

	private tl1;
	private tl2;
	private tm;
	private uploadPos = false;
	private myFilesPos = false;


	constructor(private http:Http) {}

	ngOnInit() {
		this.getFiles();
	}

	public getUpload(event){

		switch(this.uploadPos){

			case false:
				console.log(this.tl2);
				//Close the other view before opening the other one
				if(	typeof this.tl2 != 'undefined'){
					this.tl2.reverse();
					this.myFilesPos = false;
				}

				this.tl1 = new TimelineLite();
				this.tl1.to('#appUpload', .5, {right:140});
				this.uploadPos = true;
				break;

			default:
				this.tl1.reverse();
				this.uploadPos = false;
				break;

		}
	}


	public getMyFiles(event){
		switch(this.myFilesPos){

			case false:
				//Close the other view before opening the other one
				if(typeof this.tl1 != 'undefined'){
					this.tl1.reverse();
					this.uploadPos = false;
				}

				this.tl2 = new TimelineLite();
				this.tl2.to('#appUpload', .5, {right:140});
				this.myFilesPos = true;
				break;

			default:
				this.tl2.reverse();
				this.myFilesPos = false;
				break;

		}
	}

	public getFiles(){
		this.http.get('http://localhost:8000/api/v1/files')
			.subscribe(
				data=>{
					console.log(data.json());
					this.files = data.json();
				}, 
				err => {
			        console.log("Ummm yea... I am gonna have to go ahead and disagree with you there.")
			    }
			);
	}
}
