
import { Injectable } from '@angular/core';
import { Http, Headers, Response } from '@angular/http';


@Injectable()
export class GeneralService {

   constructor(private http: Http) { }

   public convertToCSV(objArray) {
		var array = typeof objArray != 'object' ? JSON.parse(objArray) : objArray;
		var str = '';

		for (var i = 0; i < array.length; i++) {
		    var line = '';
		    for (var index in array[i]) {
		        if (line != '') line += ','

		        line += array[i][index];
		    }

		    str += line + '\r\n';
		}

		return str;
	}

	public downloadFile(data: any) {

		let blob = new Blob([data], { type: 'text/csv' });
		let url = window.URL.createObjectURL(blob);

		if(navigator.msSaveOrOpenBlob) {
		    navigator.msSaveBlob(blob, 'Book.csv');
		} else {
		    let a = document.createElement('a');
		    a.href = url;
		    a.download = 'Book.csv';
		    document.body.appendChild(a);
		    a.click();        
		    document.body.removeChild(a);
		}
		window.URL.revokeObjectURL(url);
	}
}