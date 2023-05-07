const router = require('express').Router();
const { User, Task } = require('../models');
const withAuth = require('../utils/auth');



// router.get('/', (req, res) => {
//   res.render('homepage', {
//     layout: 'main', 
//   isLogged_in: req.session.isLogged_in})
// })


// Prevent non logged in users from viewing the homepage
router.get('/', async (req, res) => {
  try {

    res.render('homepage', {
      layout: 'main',
      // Pass the logged in flag to the template
      isLogged_in: req.session.logged_in,
    });
  } catch (err) {
    res.status(500).json(err);
  }
});


router.get('/dashboard', withAuth, async (req, res) => { 

  const taskData = await Task.findAll({
    include: [
      {
        model: User,
        attributes: ['name'],
      },
    ],
  });

    const taskz = taskData.map((task) => task.get({ plain: true})) 
  

  res.render('dashboard', { 
    taskz,
    layout: 'main',
    isLogged_in: req.session.logged_in });


    console.log(taskz)

});

router.get('/login', (req, res) => {
  // If a session exists, redirect the request to the homepage
  if (req.session.logged_in) {
    res.redirect('dashboard');
    return;
  }

  res.render('login');
});


router.get('/signup', (req, res) => {
  res.render('signup')
})

module.exports = router;
