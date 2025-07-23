var express = require('express');
var router = express.Router();

/**
 * TestService Specific Routes
 */
var testService = require('../services/test');
router.get('/getAllTest',testService.getAllTest);
router.post('/getTestById',testService.getTestDetailsFromId);
router.post('/createTest',testService.createTest);

/**
 * QuestionService Specific Routes
 */
var questionService = require('../services/question');
router.post('/getQuestion',questionService.getQuestionById);
router.post('/addQuestion',questionService.addQuestion);
router.post('/searchQuestion',questionService.searchQuestion);
router.post('/updateQuestion',questionService.updateQuestion);
router.post('/changeQuestionStatus',questionService.changeQuestionStatus);

/**
 * ResultService Specific Routes
 */
var resultService = require('../services/result');
router.get('/getAllCompletedTest',resultService.getAllCompletedTest);
router.post('/getResultMainDetailsByTestId',resultService.getResultMainDetailsByTestId);

module.exports = router;