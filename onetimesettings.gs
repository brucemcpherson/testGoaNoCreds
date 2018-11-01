// domething like this needs to be run just once to store credentials against a name
// get your own credentials for all of this  
function setOneTimeCredentials () {
  
  var propertyStore = PropertiesService.getScriptProperties();
  
  // best to choose the name to match your project name in the developer console.
  // if you have multiple credentials then, add that too.
  // it'll be easier to find later.
  
  // the datastore
  // for google scopes you dont need to put in the full scope name (eg"https://www.googleapis.com/auth/xxxx")
  // the function below will expand them.
  cGoa.GoaApp.setPackage (propertyStore , { 
    clientId : "xx.apps.googleusercontent.com",
    clientSecret : "xx",
    scopes : cGoa.GoaApp.scopesGoogleExpand (['datastore','userinfo.email']),
    service: 'google',
    packageName: 'DriverDatastore_example'
  });

  
  // the datastore using a service account
  // in this case , the credentials are in a .JSON file you downloaded from the develoepr console.
  // this creates a property service version so it can refresh when required
  // the driveapp is passed so that unnecessary drive authentication is avoided in normla operation
  cGoa.GoaApp.setPackage (propertyStore , cGoa.GoaApp.createServiceAccount (DriveApp , {
    packageName: 'DriverDatastore_serviceaccount',
    fileId:'xx',
    scopes : cGoa.GoaApp.scopesGoogleExpand (['datastore','userinfo.email']),
    service:'google_service'
  }));

  // this one connects to onedrive
  cGoa.GoaApp.setPackage (propertyStore , {  
    clientId : "xx",
    clientSecret : "xx",
    scopes : ["wl.signin","wl.basic","wl.offline_access","wl.skydrive_update"],
    service: 'live',
    packageName: 'onedrive'
  });
  
  // soundcloud
  cGoa.GoaApp.setPackage (propertyStore , { 
    clientId: "xx",               
    clientSecret:"xx",
    scopes : ["non-expiring"],
    service: "soundcloud",
    packageName: "soundcloud"
  });
  
  // podio
  cGoa.GoaApp.setPackage (propertyStore , { 
    clientId: "xliberation",               
    clientSecret:"xx",
    scopes : [],
    service: "podio",
    packageName: "podio"
  });
  
  // reddit
  cGoa.GoaApp.setPackage (propertyStore , { 
    clientId: "xx",               
    clientSecret:"xx",
    scopes : ["identity"],
    service: "reddit",
    packageName: "reddit"
  });
  
  // shoeboxd
  cGoa.GoaApp.setPackage (propertyStore ,{ 
    clientId: "xx",               
    clientSecret:"xx.xx.xx.xx",
    scopes : ["all"],
    service: "shoeboxed",
    packageName: "shoeboxed"
  });
  
  cGoa.GoaApp.setPackage (propertyStore ,{ 
    clientId: "xx",               
    clientSecret:"xx",
    scopes : [],
    service: "asana",
    packageName: "asanaCredentials"
  }); 
  
  cGoa.GoaApp.setPackage (propertyStore ,{ 
    clientId : "xx",
    clientSecret : "xx",
    scopes : [
      'gist',
      'repo'
    ],
    service: 'github',
    packageName: 'githubgoa'
  });
  
  
  
}