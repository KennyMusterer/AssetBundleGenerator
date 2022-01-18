import { Injectable, ɵCompiler_compileModuleAndAllComponentsAsync__POST_R3__ } from '@angular/core';

declare let Neutralino: any;
declare let NL_OS: string;

@Injectable({
  providedIn: 'root'
})
export class UnityService {

  filesToConvert: string[] = [];

  constructor() { }

  addFile(filepath: string): boolean{
    	
    let formattedPath;
    if(NL_OS == "Windows"){
      formattedPath = filepath.replace("\/","\\");
    }
    else{
      formattedPath = filepath.replace("\\","\/");
    }

    if(this.filesToConvert.indexOf(formattedPath, 0) > -1){
      return false;
    }
    else{
      this.filesToConvert.push(formattedPath);
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

    this.copyFilesToConvert()
      	.then(async ()=> {
          console.log('resolve');
          await this.convert(unityDir);
        })
        .catch(()=>{
          console.log('reject');
          return false;
        });

    
  }

  private async checkGit(): Promise<boolean>{
    let result = await Neutralino.os.execCommand("git --version");
    console.log(result);
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
      result = await Neutralino.os.execCommand("cd " + unityDir + " && dir /A D /B Unity.ex*");
    } 
    else if(NL_OS == "Darwin"){
      result = await Neutralino.os.execCommand("ls " + unityDir + " | grep Unity.app");
      if(result.stdOut.includes("Unity.app")){
        return true;
      }
      else{
        return false;
      }
    }
    else if(NL_OS == "Linux"){
      result = await Neutralino.os.execCommand("ls " + unityDir + " | grep Unity.exe");
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
      if(result.stdOut.includes("AssetBundleGenerator")){
        return true;
      }
      else{
        await Neutralino.os.execCommand("cd %temp% && md AssetBundleGenerator");
        return false;
      }
    }
    else{
      result = await Neutralino.os.execCommand("cd $TMPDIR && ls | grep AssetBundle");
      if(result.stdOut.includes("AssetBundleGenerator")){
        return true;
      }
      else{
        await Neutralino.os.execCommand("cd $TMPDIR && mkdir AssetBundleGenerator");
        return false;
      }
    }  
  }

  private async cloneProject(): Promise<boolean>{

    let result 
    if(NL_OS == "Windows"){
      result = await Neutralino.os.execCommand("cd %temp%/AssetBundleGenerator && git clone -b unity-batch https://github.com/KennyMusterer/AssetBundleGenerator.git");
    }
    else{
      result = await Neutralino.os.execCommand("cd $TMPDIR/AssetBundleGenerator && git clone -b unity-batch https://github.com/KennyMusterer/AssetBundleGenerator.git");
    }
    console.log("Project cloned");
    return true;
  }

  private async copyFilesToConvert(){
    var copiedAll = new Promise((resolve, reject) => {
        this.filesToConvert.forEach(async file=>{
        let result;

        if(NL_OS == "Windows"){
          console.log(`copy "${ file }" %temp%\\AssetBundleGenerator\\AssetBundleGenerator\\Assets\\Resources\\Conversion`);
          result = await Neutralino.os.execCommand(`copy "${ file }" %temp%\\AssetBundleGenerator\\AssetBundleGenerator\\Assets\\Resources\\Conversion`);
        }
        else{
          result = await Neutralino.os.execCommand(`cp ${ file } $TMPDIR/AssetBundleGenerator/AssetBundleGenerator/Assets/Resources/Conversion`);
        }
        console.log(result);
        if(this.filesToConvert.indexOf(file) == this.filesToConvert.length-1)
          resolve(true);
        
      });
    });
    return copiedAll;
  }

  private async convert(unityDir: string){
    if(NL_OS == "Windows"){
      
      console.log(`"${ unityDir }\\Unity.exe" -projectPath "%temp%\\AssetBundleGenerator\\AssetBundleGenerator" -batchMode -executeMethod ABG.CreateAssetBundles.BuildAllAssetBundles -quit -logFile C:\\Users\\19-12\\Desktop\\log.txt`);
      console.log(await Neutralino.os.execCommand(`"${ unityDir }\\Unity.exe" -projectPath "%temp%\\AssetBundleGenerator\\AssetBundleGenerator" -batchMode -executeMethod ABG.CreateAssetBundles.BuildAllAssetBundles -quit -logFile C:\\Users\\19-12\\Desktop\\log.txt`));
    }
    else{
      await Neutralino.os.execCommand(`"${ unityDir }/Unity.exe" -projectPath "$TMPDIR/AssetBundleGenerator/AssetBundleGenerator" -batchMode -executeMethod ABG.CreateAssetBundles.BuildAllAssetBundles -quit`);
    }
    return;
  }
}
