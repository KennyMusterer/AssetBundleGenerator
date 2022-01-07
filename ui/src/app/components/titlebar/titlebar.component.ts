import { Component, HostListener, OnInit } from '@angular/core';

declare let Neutralino: any;

@Component({
  selector: 'app-titlebar',
  templateUrl: './titlebar.component.html',
  styleUrls: ['./titlebar.component.css']
})
export class TitlebarComponent implements OnInit {

  constructor() { }

  dragging = false;
  xOffset = 0;

  ngOnInit(): void {
  }

  @HostListener('document:mousemove', ['$event']) 
  onMouseMove(e) {
    if (this.dragging) Neutralino.window.move(e.screenX*2  - this.xOffset, e.screenY*2);
  }

  @HostListener('window:mouseup', ['$event'])
  mouseUp(event){
    this.dragging = false;

    if(event.screenY == 0){
      Neutralino.window.maximize();
    }
  }

  async grab(e) {
    this.xOffset = e.screenX - e.pageX;
    this.dragging = true;

    if (await Neutralino.window.isMaximized()) {
      Neutralino.window.unmaximize();
    }
  }

  minimize() {
    Neutralino.window.minimize();
  }

  async switchSize() {
    
    console.log(await Neutralino.window.isMaximized());
    
    if (await Neutralino.window.isMaximized()) {
      Neutralino.window.unmaximize();
      if(this.dragging) this.dragging = false;
    }
    else {
      Neutralino.window.maximize();
    }
  }

  close() {
    Neutralino.app.exit();
  }
}
function allRelationshipQueries(allRelationshipQueries: any) {
  throw new Error('Function not implemented.');
}

