
/**
 * this is how  to do a webapp which needs authentication
 * @param {*} e - parameters passed to doGet
 * @return {HtmlOurput} for rendering
 */
function doGetReddit (e) {
  
  // this is pattern for a WebApp.
  // passing the doGet parameters (or anything else)
  // will ensure they are preservered during the multiple oauth2 processes
  
  // change this to whatever store & credentials name are being used
  var goa =  cGoa.GoaApp.createGoa('reddit',PropertiesService.getScriptProperties()).execute(e);
  
  
  // it's possible that we need consent - this will cause a consent dialog
  if (goa.needsConsent()) {
    return goa.getConsent();
  }
  
  // if we get here its time for your webapp to run and we should have a token, or thrown an error somewhere
  if (!goa.hasToken()) throw 'something went wrong with goa - did you check if consent was needed?';
  
  // This is a webapp doing whaever its supposed to do
  // getParams is used to retrieve the original parameters passed to this function
  var result = testReddit (goa.getToken(), goa.getParams() );   
  
  // now return it as normal
  return HtmlService.createHtmlOutput (result.getContentText())
    .setSandboxMode(HtmlService.SandboxMode.IFRAME);

}

function reddit(params) {
       
  // pick up the token refreshing if necessary
  var goa =  cGoa.GoaApp.createGoa('reddit', PropertiesService.getScriptProperties()).execute(params);
  
  if (!goa.hasToken()) {
    throw 'for a non webapp version - first publish once off to provoke a dialog - token will be refreshed automatically thereafter';
  }
  
  // do a test - passing the token and any parameters that arrived to this function
  Logger.log (testReddit (goa.getToken(), goa.getParams() ));
  
} 

/**
 * this is your main processing - will be called with your access token
 * @param {string} accessToken - the accessToken
 * @param {*} params any params
 */
function testReddit (accessToken,params) {
 
   var options = {
     method: "GET",
     headers: {
       authorization: "Bearer " + accessToken
     }
   };

   return UrlFetchApp.fetch("https://oauth.reddit.com/api/v1/me", options);

}

