import { Component, OnInit } from '@angular/core';
import { TransferPageComponent } from '../transfer-page.component';

@Component({
  selector: 'app-file',
  templateUrl: './file.component.html',
  styleUrls: ['./file.component.css']
})
export class FileComponent implements OnInit {

  fileIndex: number = 0;
  parentReference: TransferPageComponent;
  path: string;
  filename: string;
  removeStyle: string = "none";

  constructor() { }

  ngOnInit(): void {
  }

  remove() {
    this.parentReference.removeFileVisualization(this.fileIndex, this.path);
  }

  changeRemoveStyle(style: string){
    this.removeStyle = style;
  }
}
