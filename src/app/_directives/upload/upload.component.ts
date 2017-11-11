import { Component, OnInit } from '@angular/core';
import { Http, Headers,Response } from '@angular/http';
import { Ng4FilesModule,Ng4FilesStatus,Ng4FilesSelected } from 'angular4-files-upload';
import * as Promise from 'bluebird';
import {HomeComponent} from '../../home/home.component';

@Component({
  selector: 'app-upload',
  inputs:['files:[]'],
  templateUrl: './upload.component.html',
  styleUrls: ['./upload.component.scss']
})

export class UploadComponent extends HomeComponent implements OnInit {

	ngOnInit() {
		super.ngOnInit();
	}

	public filesDrop(selectedFiles: Ng4FilesSelected): void {
		
		if(selectedFiles.status !== Ng4FilesStatus.STATUS_SUCCESS) {
			this.selectedFiles = selectedFiles.status;
			return;
		}

		// Build Promise Array
		let p = [];
		this.selectedFiles = Array.from(selectedFiles.files).map((file) => {

			let _formData = new FormData();
				_formData.append("file", file);
			let body = _formData;

			p.push(body);

		});

		// Execute Promise Array
		Promise.resolve(p.map((body)=>{
			this.http.post('http://localhost:8000/api/v1/upload',body, this.headers)
				.map((response:Response)=>{
					console.log(response);
				})
				.subscribe((data) => this.message.push(data));
		})).then(()=>{
			//this.getFiles();
		});
	}


	public fileSelect(selectedFiles: Ng4FilesSelected): void {

		if (selectedFiles.status !== Ng4FilesStatus.STATUS_SUCCESS) {
			this.selectedFiles = selectedFiles.status;
			return;
		}

		this.selectedFiles = Array.from(selectedFiles.files).map(file => file.name);

		// Build Promise Array
		let p = [];
		this.selectedFiles = Array.from(selectedFiles.files).map((file) => {

			let _formData = new FormData();
				_formData.append("file", file);
			let body = _formData;

			p.push(body);

		});

		// Execute Promise Array
		Promise.resolve(p.map((body)=>{
			this.http.post('http://localhost:8000/api/v1/upload',body, this.headers)
				.map((response:Response)=>{
					console.log(response);
				})
				.subscribe((data) => this.message.push(data));
		})).then(()=>{
			//this.getFiles();
		});
	}

}
