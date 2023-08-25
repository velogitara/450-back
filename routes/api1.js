var express = require('express');
var router = express.Router();
const controllerHero = require('../controllers/api/1/hero');
const controllerFund = require('../controllers/api/1/fund');
const controllerTeam = require('../controllers/api/1/team');
const controllerHistory = require('../controllers/api/1/history');
const controllerAchievements = require('../controllers/api/1/achievements');
const controllerIssuePoint = require('../controllers/api/1/issue-point');
//const controllerOrder = require('../controllers/api/1/order');
const controllerActivities = require('../controllers/api/1/activities');
const controllerProjects = require('../controllers/api/1/project');
const controllerLogos = require('../controllers/api/1/logo');
const controllerContacts = require('../controllers/api/1/contacts');
const controllerDocuments = require('../controllers/api/1/documents');
const controllerCongrats = require('../controllers/api/1/congrats');
const controllerDonats = require('../controllers/api/1/donats');
const controllerExport = require('../controllers/api/1/export/order');
const authMiddleware = require('../midleware/auth')

// Hero routes
router.post('/hero', authMiddleware, controllerHero.createHero);
router.get('/hero/:id', controllerHero.getHeroById);
router.put('/hero/:id', authMiddleware, controllerHero.updateHero);
router.delete('/hero/:id', authMiddleware, controllerHero.updateHero);
router.get('/heroes', controllerHero.deleteHero);


// Fund routes
router.get('/fund', controllerFund.getFund);
router.put('/fund', authMiddleware, controllerFund.updateFund);

// Team routes
router.get('/team', controllerTeam.getTeam);
router.put('/team', authMiddleware, controllerTeam.updateTeam);

// History routes
router.get('/history', controllerHistory.getHistory);
router.put('/history', authMiddleware, controllerHistory.updateHistory);

// Achievements routes
router.get('/achievements', controllerAchievements.getAchievements);
router.put('/achievements', authMiddleware, controllerAchievements.updateAchievements);

// Issue-point routes
router.get('/issue-point', controllerIssuePoint.getIssuePoint);
router.put('/issue-point', authMiddleware, controllerIssuePoint.updateIssuePoint);

// Order routes
//router.get('/order/activate/:id/:link', controllerOrder.);
//router.get('/order/:id', authMiddleware, controllerOrder.);
//router.put('/order/:id', authMiddleware, controllerOrder.);
//router.delete('/order/:id', authMiddleware, controllerOrder.);
//router.get('/orders', authMiddleware, controllerOrder.);
//router.post('/orders', controllerOrder.);
//router.get('/orders/quantity', controllerOrder.);

// Activities routes
router.get('/activities', controllerActivities.getActivities);
router.post('/activities', authMiddleware, controllerActivities.createActivity);
router.get('/activity/:id', controllerActivities.getActivityById);
router.put('/activity/:id', authMiddleware, controllerActivities.updateActivity);
router.delete('/activity/:id', authMiddleware, controllerActivities.deleteActivity);

// Projects routes
router.get('/projects',controllerProjects.getProjects);
router.post('/projects', authMiddleware, controllerProjects.createProject);
router.get('/project/:id', controllerProjects.getProjectById);
router.put('/project/:id', authMiddleware, controllerProjects.updateProject);
router.delete('/project/:id', authMiddleware, controllerProjects.deleteProject);

// Logos routes
router.get('/logos',controllerLogos.getLogos);
router.post('/logos', authMiddleware, controllerLogos.createLogo);
router.get('/logo/:id', controllerLogos.getLogoById);
router.put('/logo/:id', authMiddleware, controllerLogos.updateLogo);
router.delete('/logo/:id', authMiddleware, controllerLogos.deleteLogo);

// Contacts routes
router.get('/contacts', controllerContacts.getContacts);
router.put('/contacts', authMiddleware, controllerContacts.updateContacts);

// Documents routes
router.get('/documents', controllerDocuments.getDocuments);
router.put('/documents', authMiddleware, controllerDocuments.updateDocuments);

// Congrats routes
router.get('/congrats', controllerCongrats.getCongrats);
router.put('/congrats', authMiddleware, controllerCongrats.updateCongrats);

// Donats routes
router.get('/donats', controllerDonats.getDonats);
router.post('/donats', authMiddleware, controllerDonats.createDonat);
router.get('/donat/:id', controllerDonats.getDonatById);
router.put('/donat/:id', authMiddleware, controllerDonats.updateDonat);
router.delete('/donat/:id', authMiddleware, controllerDonats.deleteDonat);

// Export routes
//router.post('/export/order/:id', authMiddleware, controllerExport.);






















module.exports = router;