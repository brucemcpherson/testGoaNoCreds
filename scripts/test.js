'use strict';

/**
 * this is a webapp that needs a token.
 * either an existing one will be used, it will be refreshed , or a consent dialog will be initiated
 * eventually the result of the webapp will happen
 * @param {object} e the parameters to the webapp
 * @return {HtmlOutput} a dialog
 */
function doGet(e) {
  
  //test github
  //return doGetGithub (e);

  
  //test oneDrive
  //return doGetOneDrive (e);

  //test soundcloud
  //return doGetSoundCloud (e);


  //test datastore
  //return doGetDataStore (e);
  //return 1;
  
  //test datastore using a service account
  //return doGetDataStoreSA (e);
  //return doGetGithubRecall(e);

  
  //test podio
  //return doGetPodio (e);
  
  // test reddit
  //return doGetReddit (e);
  
  // test shoeboxd
  //return doGetShoeBoxed (e);
  
  // test Asana
  //return doGetAsana(e);
 
  var fs = [
    'githubgoa',
    'onedrive', 
    'asanaCredentials', 
    'soundcloud',
    'DriverDatastore_example',
    'DriverDatastore_serviceaccount',
    'podio',
    'reddit',
    'asanaCredentials'//,
    //'shoeboxed'
  ];

  
  // if we are being called back to get consent then the name of the package will be in the parameters
  var name = cGoa.GoaApp.getName(e);
  if(name) {
    var goa = cGoa.GoaApp.createGoa(name,PropertiesService.getScriptProperties()).execute(e); 
    // renter for consent
    if (goa.needsConsent()) {
      return goa.getConsent();
    }
  }
  
  // if we get here then we look through each one to see if any more consent is needed
  for (var i = 0; i < fs.length ; i++ ) {
    var goa = cGoa.GoaApp.createGoa(fs[i],PropertiesService.getScriptProperties()).execute(); 
    if (goa.needsConsent()) {
      return goa.getConsent();
    }
    if (!goa.hasToken()) throw 'something went wrong with goa - did you check if consent was needed?';
  }
  
  
   return HtmlService.createHtmlOutput ('all tokens created for each of ' + fs.join(','))
    .setSandboxMode(HtmlService.SandboxMode.IFRAME);

}


function nonWebappTests () {
  
  oneDrive ();
  soundCloud ();
  dataStore ();
  dataStoreSA ();
  podio ();
  reddit ();
  //shoeBoxed ();
  asana ();
  github();

}
