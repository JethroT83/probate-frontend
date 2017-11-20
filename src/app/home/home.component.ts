//Angular
import { Component,OnInit} from '@angular/core';
import { HttpClient, HttpHeaders,HttpResponse} from '@angular/common/http';
import { Router, ActivatedRoute } from '@angular/router';

//Services
import { AuthenticationService,GeneralService,Config } from '../_services/index';

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
	protected width;
	protected pc;
	protected largeBreak = 767;
	private uploadpos = false;
	private myfilespos = false;
	public loading;


	constructor(public http:HttpClient,
				private router: Router,
				private authenticationService: AuthenticationService,
				protected generalService:GeneralService,
				protected config:Config) {

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

				//Close the other view before opening the other one
				if(	this.myfilespos === true){
					this.myfilespos = false;
				}

				this.uploadpos = true;
				break;

			default:

				this.uploadpos = false;
				break;

		}

		this.onResize();
	}


	public getMyFiles(event){
		switch(this.myfilespos){

			case false:
				//Close the other view before opening the other one
				if(this.uploadpos = true){
					this.uploadpos = false;
				}

				this.myfilespos = true;
				break;

			default:
				this.myfilespos = false;
				break;

		}
	}

	public getFiles(){


		this.http.get(this.config.host+'/api/v1/files')
			.subscribe(
				(data:any)=>{
					this.files = data;
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
