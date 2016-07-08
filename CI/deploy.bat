@ECHO OFF

REM First parameter should be the environment name
SET ENV=%1

REM Second parameter should be the team city working directory
SET WORKING_DIRECTORY=%2

REM jump to :CONFIG_DEV, :CONFIG_QA, etc.
2>NUL CALL :CONFIG_%ENV%

REM if label doesn't exist
IF ERRORLEVEL 1 CALL :CONFIG_DEFAULT

EXIT /B

:CONFIG_development
  SET DEPLOY_PATH=\\ildevweb01\SI.Tradency.com\SI_V1.0
  GOTO DEPLOY
  GOTO END_CASE

:CONFIG_test
  SET DEPLOY_PATH=\\ilnetapp01\PlatformRepository\inetpub\wwwroot\SI.tradency.com\SI_V1.0
  GOTO DEPLOY
  GOTO END_CASE

:CONFIG_stage
  SET DEPLOY_PATH=\\NJNETAPP01A\STG_Repository\inetpub\wwwroot\SI.tradency.com\SI_V1.0
  GOTO DEPLOY
  GOTO END_CASE

:CONFIG_bt
  SET DEPLOY_PATH=\\njnetapp01a\BT_Repository\inetpub\wwwroot\TestRoboFX.Tradency.com\RoboX\CI
  GOTO DEPLOY
  GOTO END_CASE

:CONFIG_production
  SET DEPLOY_PATH=\\NJNETAPP01A\NJ_PRD_Platform_Repository_01\inetpub\wwwroot\robox.tradency.com\robo\RoboXLatest\CI
  GOTO DEPLOY
  GOTO END_CASE

:CONFIG_DEFAULT
  ECHO Unknown environment
  GOTO END_CASE

:DEPLOY
  ECHO %WORKING_DIRECTORY%
  ECHO %DEPLOY_PATH%
  COPY /Y %WORKING_DIRECTORY%\package.json %DEPLOY_PATH%
  DEL %DEPLOY_PATH%\*.js
  XCOPY /C /E /Y %WORKING_DIRECTORY%\dist %DEPLOY_PATH%

:END_CASE
  VER > NUL # reset ERRORLEVEL
  GOTO :EOF # return from CALL