//Angular
import { Component,OnInit} from '@angular/core';
import { Http, Headers,Response } from '@angular/http';
import { Router, ActivatedRoute } from '@angular/router';

//Services
import { AuthenticationService } from '../_services/index';
//import { Template } from '../_models/index';

//Libraries
import { Ng4FilesModule,Ng4FilesStatus,Ng4FilesSelected } from 'angular4-files-upload';
import * as Promise from 'bluebird';
import TimelineLite from 'gsap/TimelineLite';
import TimelineMax from 'gsap/TimelineMax';
declare var jquery:any;
declare var $ :any;


@Component({
	selector: 'app-home',
	templateUrl: './home.component.html',
	styleUrls: ['../app.component.scss','./home.component.scss']
})

export class HomeComponent implements OnInit {

	protected selectedFiles;
	protected files = [];
	protected message = [];
	protected headers  = new Headers({"Content-Type":"multipart/form-data",
									"cache-control": "no-cache"});
	protected width;
	protected pc;
	protected largeBreak = 767;
	private tl1;
	private tl2;
	private tm;
	private uploadpos = false;
	private myfilespos = false;


	constructor(protected http:Http,
				private router: Router,
				private authenticationService: AuthenticationService) {

		// Set width
		this.width = document.body.offsetWidth;
		this.templateChange();
	}

	ngOnInit() {
		this.getFiles();
		this.onResize();
	}

	protected onResize(){

		$( window ).resize((event)=>{
			this.width = $(window).width();
			this.templateChange();
		});
	}

	private templateChange(){
		if(this.width<=this.largeBreak){
			this.pc = false;
		}else{
			this.pc = true;
		}
	}


	public getUpload(event){

		switch(this.uploadpos){

			case false:
				//console.log(this.tl2);
				//Close the other view before opening the other one
				if(	typeof this.tl2 != 'undefined'){
					this.tl2.reverse();
					this.myfilespos = false;
				}

				this.tl1 = new TimelineLite();
				this.tl1.to('#appUpload', 1, {right:140});
				this.uploadpos = true;
				break;

			default:
				this.tl1.reverse();
				this.uploadpos = false;
				break;

		}

		this.onResize();
	}


	public getMyFiles(event){
		switch(this.myfilespos){

			case false:
				//Close the other view before opening the other one
				if(typeof this.tl1 != 'undefined'){
					this.tl1.reverse();
					this.uploadpos = false;
				}

				this.tl2 = new TimelineLite();
				this.tl2.to('#appMyFiles', 1, {right:140});
				this.myfilespos = true;
				break;

			default:
				this.tl2.reverse();
				this.myfilespos = false;
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


	public logout(event){
		this.authenticationService.logout();
		this.router.navigate(['/login']);
	}
}
