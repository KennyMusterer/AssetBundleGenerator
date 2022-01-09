import { Component, OnInit } from '@angular/core';

declare let Neutralino: any;

@Component({
  selector: 'app-transfer-page',
  templateUrl: './transfer-page.component.html',
  styleUrls: ['./transfer-page.component.css']
})
export class TransferPageComponent implements OnInit {

  unityDir: string;

  constructor() { }

  ngOnInit(): void {
  }

  async showFolderDialog() {
    this.unityDir = await Neutralino.os.showFolderDialog('Select your Unity installation directory');
  }

  async selectFiles() {
    let entries = await Neutralino.os.showOpenDialog('Save your diagram', {
      filters: [
        { name: 'Images', extensions: ['jpg', 'png'] },
        { name: 'All files', extensions: ['*'] }
      ]
    });
    console.log('You have selected:', entries);
  }
}
