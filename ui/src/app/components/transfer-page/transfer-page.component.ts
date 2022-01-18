import { Component, ComponentFactoryResolver, OnInit, ViewChild, ViewContainerRef } from '@angular/core';
import { UnityService } from 'src/app/services/unity.service';
import { FileComponent } from './file/file.component';

declare let Neutralino: any;

@Component({
  selector: 'app-transfer-page',
  templateUrl: './transfer-page.component.html',
  styleUrls: ['./transfer-page.component.css']
})
export class TransferPageComponent implements OnInit {

  unityDir: string;
  fileIndex: number = 0;
  indexHelperArray: number[] = [];
  
  @ViewChild('fileContainer', { read: ViewContainerRef }) fileContainer: ViewContainerRef;
  @ViewChild('unityInput', { read: HTMLInputElement }) unityInput: HTMLInputElement;

  constructor(private unityService: UnityService, private CFR: ComponentFactoryResolver) { }

  ngOnInit(): void {
  }

  async showFolderDialog() {
    this.unityDir = await Neutralino.os.showFolderDialog('Select your Unity installation directory');
  }

  updateDir(event: any){
    this.unityDir = event.srcElement.value;
  }

  async selectFiles() {
    let entries = await Neutralino.os.showOpenDialog('Select the files to convert', {
      filters: [
        { name: 'All files', extensions: ['*'] }
      ],
      multiSelections: true
    });

    entries.forEach(file => {
      if(this.unityService.addFile(file)) this.createFileVisualization(file)
    });

  }

  createFileVisualization(path: string) {
    let componentFactory = this.CFR.resolveComponentFactory(FileComponent);
    let childComponentRef = this.fileContainer.createComponent<FileComponent>(componentFactory);

    childComponentRef.instance.fileIndex = this.fileIndex;
    childComponentRef.instance.parentReference = this;
    childComponentRef.instance.path = path;
    childComponentRef.instance.filename = path.split("\\").pop().split("/").pop();

    this.indexHelperArray.push(this.fileIndex);
    this.fileIndex++;
  }

  removeFileVisualization(fileIndex: number, path: string) {
    this.unityService.removeFile(path);
    let convertedIndex: number = this.indexHelperArray.indexOf(fileIndex);
    this.indexHelperArray.splice(this.indexHelperArray.indexOf(fileIndex), 1);
    this.fileContainer.remove(convertedIndex);
  }

  convert(){
    this.unityService.startConversion(this.unityDir);
  }
}
