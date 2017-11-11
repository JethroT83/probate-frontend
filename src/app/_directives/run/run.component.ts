
import { Component, OnInit, Input} from '@angular/core';
import { Http, Headers,Response } from '@angular/http';
import {HomeComponent} from '../../home/home.component';


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