
import { Component, OnInit, Input} from '@angular/core';
//import { Http, Headers,Response } from '@angular/http';
import { HttpClient, HttpHeaders,HttpResponse} from '@angular/common/http';
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
		this.loading = true;
		this.http.get('http://localhost:8000/api/v1/run/'+fileID)
			.subscribe(
				data=>{this.loading = false;}, 
				err => {}
			);
	}


	public getCSV(fileID){

		this.http.get('http://localhost:8000/api/v1/download/'+fileID)
			.subscribe(
				result=>{

					//Convert Data
					let data = result;

					//Convert to CSV
					let csv  = this.generalService.convertToCSV(data);

					//Download tab
					this.generalService.downloadFile(csv);

				}, 
				err => {}
			);
	}

	public delete(fileID){

		this.loading = true;

		let body = new FormData();

		this.http.post('http://localhost:8000/api/v1/delete/'+fileID,body)
			.subscribe(
				result=>{
					this.getFiles();
					this.loading = false;
				}, 
				err => {}
			);
	}
}