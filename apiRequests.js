var request = require('request');
var apiRequests = {}

apiRequests.getOptions = function(url) {
    return {
        method: 'GET',
		url: 'http://canvas.instructure.com/api/v1/' + url,
		headers: {
			Authorization: 'Bearer 1009~76QRZKmxDZHwKuyoKuGlCafjTipBiVZwpbTlTkyfKI73LZePXJLmVNdg4eDLOM2k'
		}
    }
}

apiRequests.getAlexaText = function(sendText) {
   return {
        "version": "1.0",
        "sessionAttributes": {},
        "response": {
            "outputSpeech": {
                "type": "PlainText",
                "text": sendText
            }
        }
    }
}

apiRequests.get = function(requestOptions, callback) {
    request.get(requestOptions, function(err, res, body) {
		if (err) {
            callback(err);
		} else {
            callback(JSON.parse(body))
		}
	})
}

apiRequests.gradeParser = function(classString) {
    return classString.split("fa17")
}

apiRequests.getIntentURL = function(intentType) {
    switch(intentType)
    {
        case 'ToDoIntent':
            // https://canvas.instructure.com/api/v1/users/self/todo
            return 'users/self/todo';
        // case 'FeedbackIntent':
        //     break;
        case 'GradesIntent':
            // https://canvas.instructure.com/api/v1/courses?include[]=total_scores&enrollment_state=active
            return 'courses?include[]=total_scores&enrollment_state=active';
        case 'InboxIntent':
            // https://canvas.instructure.com/api/v1/conversations
            return 'conversations';
        case 'CoursesIntent':
            // https://canvas.instructure.com/api/v1/courses?enrollment_state=active
            return 'courses?enrollment_state=active';
        // case 'AnnouncementsIntent':
        //     break;
        case 'ActivitySummaryIntent':
            // https://canvas.instructure.com/api/v1/users/self/activity_stream/summary
            return 'users/self/activity_stream/summary';
        case 'RecentActivityIntent':
            // https://canvas.instructure.com/api/v1/users/self/activity_stream
            return 'users/self/activity_stream/';
        default:
            break;
    }
}

module.exports = apiRequests;


// {
//     "intents": [
//       //{
//         //"intent": "ToDoIntent",
//         //"slots": []
//       //},
//       //{
//         //"intent": "FeedbackIntent",
//        // "slots": []
//       //},
//       {
//         "intent": "GradesIntent",
//         "slots": []
//       }
//       //{
//         //"intent": "InboxIntent",
//         //"slots": []
//       //},
//       //{
//         //"intent": "CoursesIntent",
//         //"slots": []
//       //},
//       //{
//         //"intent": "AnnouncementsIntent",
//         //"slots": []
//       //}
//     ]
//   }

// ToDoIntent what is there to do
// ToDoIntent what is due
// ToDoIntent to do
// FeedbackIntent what is my recent feedback
// FeedbackIntent what feedback have I recieved
// FeedbackIntent what is my feedback
// FeedbackIntent recent feedback
// FeedbackIntent feedback
// GradesIntent what are my grades
// GradesIntent grades
// GradesIntent how are my grades
// GradesIntent marks
// InboxIntent what's in my inbox
// InboxIntent inbox
// InboxIntent what is in my inbox
// CoursesIntent what are my courses
// CoursesIntent what courses am I in
// CoursesIntent what courses am I enrolled in
// CoursesIntent courses
// CoursesIntent courses I'm in
// CoursesIntent courses I am in
// AnnouncementsIntent what are my recent announcements
// AnnouncementsIntent recent announcements
// AnnouncementsIntent announcements
// AnnouncementsIntent what are my announcements