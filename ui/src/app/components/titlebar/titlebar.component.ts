import { Component, OnInit } from '@angular/core';

declare let Neutralino: any;

@Component({
  selector: 'app-titlebar',
  templateUrl: './titlebar.component.html',
  styleUrls: ['./titlebar.component.css']
})
export class TitlebarComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
    Neutralino.window.setDraggableRegion('title');
  }

  minimize() {
    Neutralino.window.minimize();
  }

  maximize() {
    if (Neutralino.window.isMaximized()) {
      Neutralino.window.unmaximize();
    }
    else {
      Neutralino.window.maximize();
    }
  }

  close() {
    Neutralino.app.exit();
  }
}
