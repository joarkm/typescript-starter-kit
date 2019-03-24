# Starter kit for Typescript development (with Visual Studio Code)

Please feel free to clone this repo to quickly begin developing and trying out Typescript features in your local development environment.  
Note: Visual Studio Code is optional to use, but recommended as I've included build, watch and debug tasks for use with Visual Studio code.

## Building and watching for file changes
There is a run task defined in .vscode/tasks.json named 'build watch' which runs the command  
```sh
tsc --watch
```  
The command ```tsc``` looks for additional options specifed in ```tsconfig.json```. In there options like input path to source files and output path for build files are specified.  
 See ```tsconfig.json``` for the complete list of the options specified.

## Debugging
Sourcemaps are enabled for debug support.  
There is a launch config located in launch.json which enables debugging in Visual Studio Code.  
It can be run by navigating to the debug menu and selecting the "Program" launch configuration from the dropdown menu.
