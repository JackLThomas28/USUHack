
var apiRequests = require('./apiRequests')
var moment = require('moment');

exports.handler = function(event, context, callback) {
//var tempHandler = function(event, context, callback) {
    var intentType = null
    if (event.request && event.request.intent && event.request.intent.name) {
        intentType = event.request.intent.name
        var requestOptions = apiRequests.getOptions(apiRequests.getIntentURL(intentType))
        apiRequests.get(requestOptions, function(response) {
            var responseText = "";
            switch(intentType) {
                case 'ToDoIntent':
                    if (response) {
                        responseText = 'You have ' + response.length + ' assignments due soon.';
                        if (response.length == 0) {
                          responseText = responseText + ' Good job!';
                        } else {
                          responseText = responseText + ' They are, ';
                        }
                        response.forEach(function(element, index) {
                            if (element) {
                              responseText = responseText + ' Assignment ' + (index + 1) + '; on ';
                              responseText = responseText + moment(element.assignment.due_at).format('MMMM Do h:mm:ss a') + ' ; ';
                              responseText = responseText + element.assignment.name + ';';
                            }
                        })
                    } else {
                        responseText = "Grades response check failed"
                    }
                    break;
                case 'GradesIntent':
                    if (response) {
                        response.forEach(function(element) {
                            if (element.enrollments[0] && element.enrollments[0].computed_current_score) {
                                responseText = responseText + " Your grade in " + apiRequests.gradeParser(element.name) + " is " + element.enrollments[0].computed_current_score + ";";                                
                            }
                        })
                    } else {
                        responseText = "Grades response check failed"
                    }
                    break;
                case 'CoursesIntent':
                    if (response) {
                        response.forEach(function(element) {
                            responseText = responseText + " " + element.name + " ;";
                        })
                    } else {
                        responseText = "Courses response check failed"
                    }
                    break;
                case 'ActivitySummaryIntent':
                    if (response) {
                        response.forEach(function(element) {
                            responseText = responseText + " You have " + element.count + " " + element.type + "s " + element.unread_count + " unread.";
                        })
                    } else {
                        responseText = "Activity summary response check failed"
                    }
                    break;
                case 'RecentActivityIntent':
                    if (response) {
                        response = response.slice(-5)
                        responseText = "Your activity is: "
                        response.forEach(function(element,index) {
                            console.log("element", element)
                            responseText = responseText + " New  " + element.type + " " + element.title + ";"
                        })
                    } else {
                        responseText = "Recent actvity response check failed"
                    }
                    break;
                case 'InboxIntent':
                    if (response) {
                        response = response.slice(-5)
                        responseText = "You have " + response.length + " messages;"
                        var count = 0
                        response.forEach(function(element) {
                            count += 1
                            responseText = responseText + " message " + count + "; " + element.subject + " from " + element.participants[0].name + ";"
                        })
                    }
                    break;
            }
            callback(null, apiRequests.getAlexaText(responseText));
        })
    } 
    else {
        callback(null, apiRequests.getAlexaText("Intent not found"))
        console.log('Intent not found')
    }
}

//let e = {
//  request:
//  {
//    intent: {
//      name: 'ToDoIntent'
//    }
//  }
//}
//
//tempHandler(e, {}, function(a, b) {
//  console.log('a', a)
//  console.log('b', b)
//})