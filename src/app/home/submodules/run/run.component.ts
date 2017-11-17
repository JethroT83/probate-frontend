
import { Component, OnInit, Input} from '@angular/core';
import { Http, Headers,Response } from '@angular/http';
import {HomeComponent} from '../../home.component';
import {GeneralService} from '../../../_services/index';

@Component({
	selector: 'app-run',
	inputs:['files:[]'],
	templateUrl: './run.component.html',
	styleUrls: ['./run.component.scss']
})


export class RunComponent extends HomeComponent implements OnInit {


	ngOnInit() {
		super.ngOnInit();
	}


	public runFile(fileID){
		this.http.get('http://localhost:8000/api/v1/run/'+fileID, {headers:this.headers})
			.subscribe(
				data=>{}, 
				err => {
			        console.log("Ummm yea... I am gonna have to go ahead and disagree with you there.")
			    }
			);
	}


	public getCSV(fileID){
		this.http.get('http://localhost:8000/api/v1/download/'+fileID, {headers:this.headers})
			.subscribe(
				result=>{

					//Convert Data
					let data = result.json();

					//Convert to CSV
					let csv  = this.generalService.convertToCSV(data);

					//Download tab
					this.generalService.downloadFile(csv);
				}, 
				err => {
			        console.log("Ummm yea... I am gonna have to go ahead and disagree with you there.")
			    }
			);
	}

	public delete(fileID){

		let body = new FormData();

		this.http.post('http://localhost:8000/api/v1/delete/'+fileID,body ,{headers:this.headers})
			.subscribe(
				result=>{
					this.getFiles();
				}, 
				err => {
					console.log(err);
			        console.log("Ummm yea... I am gonna have to go ahead and disagree with you there.")
			    }
			);
	}
}