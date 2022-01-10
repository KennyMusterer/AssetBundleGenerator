import { Injectable } from '@angular/core';

declare let Neutralino: any;
declare let NL_OS: string;

@Injectable({
  providedIn: 'root'
})
export class UnityService {

  filesToConvert: string[] = [];

  constructor() { }

  addFile(filepath: string): boolean{
    if(this.filesToConvert.indexOf(filepath, 0) > -1){
      return false;
    }
    else{
      this.filesToConvert.push(filepath);
      return true;
    }
  }

  removeFile(filepath: string){
    const index = this.filesToConvert.indexOf(filepath, 0);
      if (index > -1) {
        this.filesToConvert.splice(index, 1);
      }
  }

  async startConversion(unityDir: string){

    console.log(NL_OS);

    if(!await this.checkGit()) return false;
    
    if(!await this.checkUnity(unityDir)) return false;

    if(!await this.checkProject()){
      if(!await this.cloneProject()) return false;
    }
  }

  private async checkGit(): Promise<boolean>{
    let result = await Neutralino.os.execCommand("git --version");

    if(result.stdOut.includes("git version")){
      return true;
    }
    else{
      return false;
    }
  }

  private async checkUnity(unityDir: string): Promise<boolean>{
    
    let result;
    
    if(NL_OS == "Windows"){
      result = await Neutralino.os.execCommand("cd " + unityDir + " && dir");
    } 
    else{
      result = await Neutralino.os.execCommand("cd " + unityDir + " && ls");
    }
    

    if(result.stdOut.includes("Unity.exe")){
      return true;
    }
    else{
      return false;
    }
  }

  private async checkProject(): Promise<boolean>{
    let result;
    
    if(NL_OS == "Windows"){
      result = await Neutralino.os.execCommand("cd %temp% && dir /A D /B AssetBundle*");
    }
    else{
      //result = await Neutralino.os.execCommand("cd %temp% && dir");
    }

    if(result.includes("AssetBundleGenerator")){
      return true;
    }
    else{
      await Neutralino.os.execCommand("cd %temp% && md AssetBundleGenerator");
      return false;
    }
  }

  private async cloneProject(): Promise<boolean>{

    let result = await Neutralino.os.execCommand("cd %temp%/AssetBundleGenerator && git clone -b unity-batch https://github.com/KennyMusterer/AssetBundleGenerator.git");

    if(result.split(" ").pop().includes("done")){
      return true;
    }
    return false;
  }
}
