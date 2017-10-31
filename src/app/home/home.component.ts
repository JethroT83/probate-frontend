import { Component, OnInit } from '@angular/core';
import { Http, Headers,Response } from '@angular/http';
import { Ng4FilesModule,Ng4FilesStatus,Ng4FilesSelected } from 'angular4-files-upload';
import * as Promise from 'bluebird';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

	public selectedFiles;
	private message = [];
	private headers  = new Headers({"Content-Type":"multipart/form-data",
									"cache-control": "no-cache"});
	constructor(private http:Http) { 

	}

	ngOnInit() {
	}


	public filesSelect(selectedFiles: Ng4FilesSelected): void {
		
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
		}));

	}

}
