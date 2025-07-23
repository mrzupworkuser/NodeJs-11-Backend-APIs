const answersheetModel = require('../models/answersheet');
const questionModel = require('../models/question');

/**
 * Get Test Status
 * @param {*} test 
 * @returns 
 */
var getTestStatus = (test) => {
  if(test.status === 'CANCELLED')
    return test.status;
  var status = 'CREATED'
  var now = new Date();
  if(Date.parse(test.resultTime) < now) {
    status = 'RESULT_DECLARED';
  } else if(Date.parse(test.endTime) < now) {
    status = 'TEST_COMPLETE';
  } else if(Date.parse(test.startTime) < now) {
    status = 'TEST_STARTED';
  } else if(Date.parse(test.regEndTime) < now) {
    status = 'REGISTRATION_COMPLETE'
  } else if(Date.parse(test.regStartTime) < now) {
    status = 'REGISTRATION_STARTED';
  }
  return status;
}

/**
 * Calculate Marks
 * @param {*} questionids 
 * @param {*} answers 
 * @param {*} ansid 
 * @returns 
 */
var calculateMarks = async(questionids, answers, ansid) => {
  var marks = 0;
  var questionDetails = await questionModel.find({_id:{$in:questionids}})
  .catch(err => {
    console.log(err);
  })
  if(questionDetails.length !== questionids.length) {
    console.log("not all questions found");
    return;
  }
  for(var i in questionDetails) {
    var index = getIndex(questionDetails[i],questionids);
    if(index!=-1 && answers[index]!=null) {
      if(questionDetails[i].answer.toString() === answers[index].toString()) {
        marks += questionDetails[i].marks;
      }
    }
  }

  answersheetModel.findOneAndUpdate({_id:ansid, completed:true},{score:marks})
  .then(result=>{
    console.log("score is added in answersheet "+ansid);
  })
  .catch(err=> {
    console.log(err);
  })
}

/**
 * Save the answer
 * @param {*} req 
 * @param {*} res 
 * @param {*} next 
 * @returns 
 */
var saveAnswer = async(req,res,next) => {
  var creator = req.user || null;
  if(creator == null || req.user.usertype != 'STUDENT') {
    res.status(401).json({
      success : false,
      message : "Permissions not granted!"
    })
  }

  req.check('answersheetid','answersheet id not found').notEmpty();
  req.check('answers','Invalid length of list of answers').isArray({min:1});

  var errors = req.validationErrors()
  if(errors) {
    console.log(errors);
    res.json({
      success:false,
      message: 'Invalid inputs',
      errors : errors
    })
    return;
  }
}

module.exports = {
  saveAnswer,
  calculateMarks,
  getTestStatus
}