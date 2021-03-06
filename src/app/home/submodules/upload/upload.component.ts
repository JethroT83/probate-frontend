import { Component, OnInit } from '@angular/core';
import { Http, Headers,Response } from '@angular/http';
import { Ng4FilesModule,Ng4FilesStatus,Ng4FilesSelected } from 'angular4-files-upload';
import * as Promise from 'bluebird';
import {HomeComponent} from '../../home.component';

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

		this.loading = true;

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
			this.http.post(this.config.host+'/api/v1/upload',body)
				.map((response:Response)=>{
					console.log(response);
				})
				.subscribe((data) => this.message.push(data));
		})).then(()=>{
			this.getFiles();
			this.loading = false;
		});
	}


	public filesButton(selectedFiles: Ng4FilesSelected): void {

		if (selectedFiles.status !== Ng4FilesStatus.STATUS_SUCCESS) {
			this.selectedFiles = selectedFiles.status;
			return;
		}

		this.loading = true;

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
			this.http.post(this.config.host+'/api/v1/upload',body)
				.map((response:Response)=>{
					console.log(response);
				})
				.subscribe((data) => this.message.push(data));
		})).then(()=>{
			this.getFiles();
			this.loading = false;
		});
	}

}
