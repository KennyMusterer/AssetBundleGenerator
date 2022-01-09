import { Component, HostListener, OnInit } from '@angular/core';

declare let Neutralino: any;

@Component({
  selector: 'app-titlebar',
  templateUrl: './titlebar.component.html',
  styleUrls: ['./titlebar.component.css']
})
export class TitlebarComponent implements OnInit {

  constructor() { }

  docked: boolean = false;
  image_src = 'assets/icons/Maximize.svg';

  ngOnInit(): void {
    Neutralino.window.setDraggableRegion('title');
  }

  @HostListener('window:mouseup', ['$event'])
  mouseUp(event) {

    if (event.screenY == 0) {
      Neutralino.window.maximize();
      this.docked = true;
      this.image_src = 'assets/icons/Restore.svg';
    }
  }

  undock() {
    if (this.docked) {
      Neutralino.window.unmaximize();
      this.docked = false;
      this.image_src = 'assets/icons/Maximize.svg';
    }
  }

  minimize() {
    Neutralino.window.minimize();
  }

  async switchSize() {

    if (await Neutralino.window.isMaximized()) {
      Neutralino.window.unmaximize();
      this.image_src = 'assets/icons/Maximize.svg';
    }
    else {
      Neutralino.window.maximize();
      this.image_src = 'assets/icons/Restore.svg';
    }
  }

  close() {
    Neutralino.app.exit();
  }
}

