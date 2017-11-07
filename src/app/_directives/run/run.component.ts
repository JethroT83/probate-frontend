
import { Component, OnInit, Input} from '@angular/core';
import { Http, Headers,Response } from '@angular/http';
import { ToolBoxService } from '../../_services/index';

@Component({
	selector: 'app-run',
	inputs:['files:[]'],
	templateUrl: './run.component.html',
	styleUrls: ['./run.component.scss']
})


export class RunComponent implements OnInit {

	@Input() public files = [];

	constructor(private http:Http,
				private tool:ToolBoxService) {

		console.log(this.files);
	}

	ngOnInit() {
		//console.log("this should be working");
		//this.getFiles();
	}

	/*public getFiles(){
		//this.tool.getFiles()
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
	}*/

	public runFile(fileID){
		this.http.get('http://localhost:8000/api/v1/run/'+fileID)
			.subscribe(
				data=>{
					console.log(data);
					//this.files = data.json();
				}, 
				err => {
			        console.log("Ummm yea... I am gonna have to go ahead and disagree with you there.")
			    }
			);
	}
}